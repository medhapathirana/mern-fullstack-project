import express from "express";
const router = express. Router();

router.post('/change-message', (req, res) => {
const clientMessage = req.body.message;
const changedMessage = `Server says: ${clientMessage}` ;
res.json({ message: changedMessage });
});

export default router;
// Export the router