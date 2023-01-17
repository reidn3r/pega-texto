
const getId = async(req, res) => {
    /*
        Tratar rota
    */

   if(path.extname(req.url).length > 0) return;    
   const { id } = req.params;
   const route = validateRoute(id);
   if(route.length == 0) return res.redirect('/');
   

   let connections = [];
   const io = req.app.get('socketio');

   io.on('connection', (socket) => {
        //Não permite várias conexões com o mesmo id
        connections.push(socket.id);
        if(connections[0] === socket.id){
            io.removeAllListeners('connection');
        }
       console.log(`id: ${socket.id} connected`);

       socket.on('save-time', async(data) => {
           await Model.findOneAndUpdate({url: id}, {content: data.content});
           console.log('text saved');
       })
   
       socket.on('input-changed', (data) => {
           io.emit('text-changed', (data));
       })
   })
   
    //route handler
    const foundRoute = await Model.findOne({ url: id });
    if (foundRoute){
        await Model.findOneAndUpdate({_id: foundRoute._id}, {num_access: foundRoute.num_access + 1});
        return res.render('main', {content: foundRoute.content});
    }
    else{
        const newRoute = new Model({url: id});
        await newRoute.save();

        //update new route num_acces to 1
        const foundNewRoute = await Model.findOne({url: id});

        await Model.findOneAndUpdate({_id: foundNewRoute._id}, {num_access: foundNewRoute.num_access + 1});        
        return res.render('main', {content: null});
    }
}