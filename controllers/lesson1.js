const momRoute = (req, res) => {
    res.send("Carolyn Butterfield");
};

const dadRoute = (req, res) => {
    res.send("Bryan Butterfield");
};

module.exports = {
    momRoute,
    dadRoute,
};