let eventDataList = [];
let lastOffset = 0;

function grabEventData(data, length) {
    let newData = data.slice(lastOffset, length);
    let trimmedLength = newData.length;
    while (trimmedLength > 0 && newData[trimmedLength - 1] === 0) trimmedLength--;
    newData = newData.slice(0, trimmedLength);

    const eventData = {
        timestamp: Date.now(),
        length: newData.length,
        data: newData
    };

    eventDataList.push(eventData);
    eventDataList.sort((a, b) => a.timestamp - b.timestamp);
    console.log(eventData);

    lastOffset = length;
}

function dumpEventDataToFile() {
    if (eventDataList.length === 0) return;
    eventDataList.forEach((event) => {
        const jsonString = JSON.stringify(event.data);
        const blob = new Blob([jsonString], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `event_file_${event.timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    });
    eventDataList = [];
}

function getActiveMobs(mobs) {
    const active = [];
    for (const id in mobs) {
        const mob = mobs[id];
        if (mob !== null && mob !== undefined) {
            active.push({ id: Number(id), ...mob });
        }
    }
    return active;
}