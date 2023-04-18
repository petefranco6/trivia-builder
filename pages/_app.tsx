import '@/styles/globals.css'
//import { socket } from './socket';
import type { AppProps } from 'next/app'
import React, { useState, useEffect  } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [socketId, setSocketId] = useState("");

  // useEffect(() => {
  //   if(socket){
  //     console.log(socket)
  //     setSocketId(socket.id);
  //   } else {
  //     setSocketId("");
  //   }

  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);



  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, []);

  // pageProps.isConnected = isConnected;
  // pageProps.socketId = socketId;


  return <Component {...pageProps}/>
}
