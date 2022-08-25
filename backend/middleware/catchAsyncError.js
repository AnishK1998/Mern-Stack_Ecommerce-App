module.exports = (incomingFunction) => (req,res,next)=>{
    Promise.resolve(incomingFunction(req,res,next)).catch(next);
}