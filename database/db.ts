import mongoose from "mongoose";

/*
0 = disconnected 
1 = connected
2 = connecting
3 = disconnecting
*/

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  console.log( "Estado de la conexión: ", mongooConnection.isConnected );
  if (mongooConnection.isConnected) {
    console.log("DB - Ya estabamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooConnection.isConnected === 1) {
      console.log("DB - Usando conección anterior");
      return;
    }

    await mongoose.disconnect();
    console.log( "Estado de la conexión: ", mongooConnection.isConnected );
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongooConnection.isConnected = 1;
  console.log("DB - Conectado a MongoDB: ", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return; //Para no desconectarme en desarrollo
  if (mongooConnection.isConnected === 0) return;
  await mongoose.disconnect();
  mongooConnection.isConnected = 0;
  console.log("DB - Desconectado de MongoDB");
};
