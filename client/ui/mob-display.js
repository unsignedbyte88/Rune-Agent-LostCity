function renderMobList() {
    const mobListDiv = document.getElementById("mob-list");
    mobListDiv.innerHTML = "";
    const active = getActiveMobs(mobs);

    if (active.length === 0) {
        mobListDiv.textContent = "No active mobs.";
        return;
    }

    for (const mob of active) {
        const line = document.createElement("div");
        line.textContent = `Mob ${mob.id} [Type: ${mob.npcType ?? "?"}]`;
        line.style.cursor = "pointer";
        line.style.padding = "2px 0";
        line.onclick = () => showMobDetails(mob.id);
        mobListDiv.appendChild(line);
    }
}

function showMobDetails(mobId) {
    const mob = mobs[mobId];
    const container = document.getElementById("mob-info-body");
    if (!mob) {
        container.textContent = "No mob found.";
        return;
    }

    const info = [
        `ID: ${mobId}`,
        `Type: ${mob.npcType ?? "?"}`,
        `Health: ${mob.health ?? "?"}/${mob.totalHealth ?? "?"}`,
        `Coords: X=${mob.localX ?? "?"}, Z=${mob.localZ ?? "?"}`,
        `Target: ${mob.targetId ?? "none"}`,
        `Chat: ${mob.chat ?? "—"}`,
        `Mask: ${mob.lastMask ?? "—"}`,
        `Animation: ${mob.primarySeqId ?? "—"} (Delay: ${mob.primarySeqDelay ?? "—"})`
    ];
    container.textContent = info.join('\n');
}