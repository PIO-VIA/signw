/**
 * SIGNW — Moteur de calcul du Score de Confiance et d'Adéquation Projet ↔ Agent
 * Sections 6.4 et 6.5
 */

window.SignwScore = {
  /**
   * Calcul du score de confiance (0-100) pour un dossier donné
   */
  calculateDossierScore(dossierId) {
    if (!window.SignwStore) return { scoreTotal: 0, piliers: {}, niveau: 'Non certifiable' };

    const dossier = window.SignwStore.getDossierById(dossierId);
    if (!dossier) return { scoreTotal: 0, piliers: {}, niveau: 'Non certifiable' };

    const schema = window.SignwStore.getFormSchemaBySector(dossier.secteurId);
    const pieces = window.SignwStore.getPiecesByDossier(dossierId);
    const params = window.SignwStore.getParameters() || {};
    const bareme = params.baremePiliers || { admin: 20, fin: 25, tech: 25, ref: 20, rh: 10 };

    const pilierScores = { admin: 0, fin: 0, tech: 0, ref: 0, rh: 0 };
    const pilierMax = { admin: 0, fin: 0, tech: 0, ref: 0, rh: 0 };

    if (schema && schema.sections) {
      schema.sections.forEach(sec => {
        const pilier = sec.pilier || 'admin';
        if (sec.champs) {
          sec.champs.forEach(ch => {
            const poids = ch.poids || 1;
            if (pilierMax[pilier] !== undefined) {
              pilierMax[pilier] += poids;
            }

            // Vérifier la pièce associée ou la réponse
            const p = pieces.find(item => item.champId === ch.id);
            let coeff = 0;
            if (p) {
              if (p.statutPiece === 'validee') {
                coeff = p.niveauRisque === 'moyen' ? 0.7 : (p.niveauRisque === 'eleve' ? 0.4 : 1.0);
              } else if (p.statutPiece === 'en_verification' || p.statutPiece === 'deposee') {
                coeff = 0.5; // score provisoire estimé
              }
            } else if (dossier.reponses && dossier.reponses[ch.id]) {
              coeff = 1.0;
            }

            if (pilierScores[pilier] !== undefined) {
              pilierScores[pilier] += poids * coeff;
            }
          });
        }
      });
    }

    // Normalisation selon le barème configuré
    let totalScore = 0;
    const piliersResult = {};

    Object.keys(bareme).forEach(p => {
      const maxPtsPoids = pilierMax[p] || 1;
      const ptsObtenus = pilierScores[p] || 0;
      const pctPilier = Math.min(100, Math.round((ptsObtenus / maxPtsPoids) * 100));
      piliersResult[p] = pctPilier;

      const pondere = (pctPilier / 100) * bareme[p];
      totalScore += pondere;
    });

    totalScore = Math.min(100, Math.round(totalScore));

    // Niveaux
    const seuils = params.seuils || { or: 85, argent: 70, bronze: 55 };
    let niveau = 'Non certifiable';
    if (totalScore >= seuils.or) {
      niveau = 'Or';
    } else if (totalScore >= seuils.argent) {
      niveau = 'Argent';
    } else if (totalScore >= seuils.bronze) {
      niveau = 'Bronze';
    }

    return {
      scoreTotal: totalScore,
      piliers: piliersResult,
      niveau,
      bareme
    };
  },

  /**
   * Calcul de l'adéquation Projet ↔ Agent (Section 6.5)
   */
  evaluateAdequacy(project, agent) {
    if (!project || !agent) return null;

    const budget = Number(project.budgetFCFA) || 0;
    const ca = Number(agent.caMoyen3ans) || 1;
    const exigences = project.exigences || {};

    const criteria = [];
    const pointsBloquants = [];
    const pointsAttention = [];

    // a) Capacité financière (ratio budget / CA)
    const ratio = budget / ca;
    let scoreFinancier = 100;
    let finMessage = '';
    let finStatus = 'success';

    if (ratio <= 0.5) {
      scoreFinancier = 100;
      finMessage = `Excellent ratio (${(ratio * 100).toFixed(0)} % du CA). Le projet représente moins de la moitié du chiffre d’affaires annuel moyen (${window.SignwUtils.formatFCFA(ca)}).`;
    } else if (ratio <= 1.0) {
      scoreFinancier = 80;
      finMessage = `Ratio acceptable (${(ratio * 100).toFixed(0)} % du CA). Capacité financière suffisante pour absorber le montant du marché.`;
    } else if (ratio <= 1.5) {
      scoreFinancier = 55;
      finStatus = 'warning';
      finMessage = `Ratio élevé (${(ratio * 100).toFixed(0)} % du CA). Risque de tension sur la trésorerie sans ligne de crédit bancaire robuste.`;
      pointsAttention.push(`Le budget du projet représente ${(ratio * 100).toFixed(0)} % du CA annuel de l’agent.`);
    } else {
      scoreFinancier = 25;
      finStatus = 'danger';
      finMessage = `Capacité financière insuffisante : le projet (${window.SignwUtils.formatFCFA(budget)}) excède 150 % du CA moyen (${window.SignwUtils.formatFCFA(ca)}).`;
      pointsBloquants.push(`Chiffre d’affaires moyen insuffisant au regard du budget de ${window.SignwUtils.formatFCFAShort(budget)}.`);
    }

    criteria.push({
      id: 'fin',
      titre: 'Capacité financière',
      score: scoreFinancier,
      statut: finStatus,
      valeurDeclaree: window.SignwUtils.formatFCFA(ca),
      valeurRequise: `Min. ${window.SignwUtils.formatFCFA(exigences.caMinimum || budget * 0.7)}`,
      detail: finMessage
    });

    // b) Niveau de certification
    const levelsMap = { 'Or': 3, 'Argent': 2, 'Bronze': 1, 'Avec réserves': 1 };
    const requiredLevel = exigences.certificationMinimale || 'Bronze';
    const agentLevel = agent.niveau || 'Bronze';
    const diffLevel = (levelsMap[agentLevel] || 0) - (levelsMap[requiredLevel] || 0);

    let scoreCertif = 75;
    let certStatus = 'success';
    let certMessage = '';

    if (diffLevel >= 0) {
      scoreCertif = 100;
      certMessage = `Niveau ${agentLevel} conforme ou supérieur au niveau minimal exigé (${requiredLevel}).`;
    } else {
      scoreCertif = 30;
      certStatus = 'danger';
      certMessage = `Niveau ${agentLevel} inférieur au niveau minimal ${requiredLevel} requis par le cahier des charges.`;
      pointsBloquants.push(`Certification minimale requise non atteinte (${agentLevel} vs ${requiredLevel}).`);
    }

    criteria.push({
      id: 'certif',
      titre: 'Niveau de certification signw',
      score: scoreCertif,
      statut: certStatus,
      valeurDeclaree: agentLevel,
      valeurRequise: requiredLevel,
      detail: certMessage
    });

    // c) Expérience et références chantiers
    const expMin = exigences.experienceMinAns || 3;
    const agentExp = (new Date().getFullYear()) - (agent.anneeCreation || 2020);
    let scoreExp = 80;
    let expStatus = 'success';
    let expMsg = `${agentExp} années d’expérience vérifiées dans le secteur.`;

    if (agentExp >= expMin) {
      scoreExp = 95;
    } else {
      scoreExp = 40;
      expStatus = 'danger';
      expMsg = `Ancienneté insuffisante (${agentExp} ans vs ${expMin} ans exigés).`;
      pointsBloquants.push(`Expérience d’activité insuffisante (${agentExp} ans).`);
    }

    criteria.push({
      id: 'exp',
      titre: 'Ancienneté et références chantiers',
      score: scoreExp,
      statut: expStatus,
      valeurDeclaree: `${agentExp} ans`,
      valeurRequise: `${expMin} ans`,
      detail: expMsg
    });

    // d) Matériel & Engins requis
    const reqEquip = exigences.materielRequis || [];
    let equipScore = 90;
    let equipStatus = 'success';
    let equipMsg = 'Parc d’engins lourd conforme aux exigences du chantier.';
    const equipDetails = [];

    if (reqEquip.length > 0) {
      // Comparer avec la capacité technique de l'agent
      let matches = 0;
      reqEquip.forEach(eq => {
        const hasEquip = agent.score >= 70; // Les agents au-dessus de 70 ont un parc audité
        equipDetails.push({
          type: eq.type,
          requis: eq.quantiteMin,
          possede: hasEquip ? eq.quantiteMin : Math.max(0, eq.quantiteMin - 1),
          verifie: hasEquip
        });
        if (hasEquip) matches++;
      });

      const equipPct = matches / reqEquip.length;
      equipScore = Math.round(equipPct * 100);
      if (equipPct < 0.6) {
        equipStatus = 'danger';
        equipMsg = 'Engins clés manquants ou non vérifiés lors des audits.';
        pointsBloquants.push('Disponibilité insuffisante d’engins lourds nécessaires au lot terrassement.');
      } else if (equipPct < 1.0) {
        equipStatus = 'warning';
        equipMsg = 'Une partie du matériel lourd devra faire l’objet d’une convention de location validée.';
        pointsAttention.push('Matériel lourd partiellement détenu en propre.');
      }
    }

    criteria.push({
      id: 'tech',
      titre: 'Matériel et équipements de chantier',
      score: equipScore,
      statut: equipStatus,
      valeurDeclaree: `${equipScore}% vérifié`,
      valeurRequise: '100% conforme',
      detail: equipMsg,
      equipDetails
    });

    // Score Global Pondéré
    const globalScore = Math.round(
      (scoreFinancier * 0.35) +
      (scoreCertif * 0.25) +
      (equipScore * 0.25) +
      (scoreExp * 0.15)
    );

    let verdict = 'insuffisant';
    let verdictLabel = 'Insuffisant';
    let phraseSynthese = '';

    if (globalScore >= 80 && pointsBloquants.length === 0) {
      verdict = 'adequat';
      verdictLabel = 'Adéquat';
      phraseSynthese = `Cet agent peut réaliser le projet pour ${window.SignwUtils.formatFCFAShort(budget)} : OUI, toutes les garanties financières, techniques et humaines sont attestées.`;
    } else if (globalScore >= 60 || pointsBloquants.length <= 1) {
      verdict = 'adequat_sous_reserves';
      verdictLabel = 'Adéquat sous réserves';
      const raison = pointsAttention[0] || pointsBloquants[0] || 'Vérification préalable des cautions bancaires requise';
      phraseSynthese = `Cet agent peut réaliser le projet pour ${window.SignwUtils.formatFCFAShort(budget)} ? OUI avec réserves : ${raison}.`;
    } else {
      verdict = 'insuffisant';
      verdictLabel = 'Insuffisant';
      phraseSynthese = `Cet agent ne présente pas les garanties requises pour ce marché : ${pointsBloquants[0] || 'capacité financière et technique sous-dimensionnée'}.`;
    }

    return {
      agentId: agent.id,
      projectId: project.id,
      scoreAdequation: globalScore,
      verdict,
      verdictLabel,
      phraseSynthese,
      criteria,
      pointsBloquants,
      pointsAttention,
      calculeLe: new Date().toISOString().split('T')[0]
    };
  }
};
