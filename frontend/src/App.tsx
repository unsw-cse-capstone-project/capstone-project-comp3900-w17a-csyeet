import * as React from "react";
import "./App.css";
import { Header } from "./ui/base/header/Header";
import { ModalStore } from "./stores/ModalStore";
import { AuthModal }  from "./ui/base/modal/AuthModal"

function App() {
  const authModalStore = new ModalStore();
  return (
    <div className="App">
      <Header
        user={user}
        onCreateAccount={() => {
          authModalStore.modalOpen = true; 
          authModalStore.modalType = "signup";
          return;
        }}
        onLogin={() => {
          toggleSignInModal(!signInModal);
          return;
        }}
        onLogout={() => {
          setUser(null);
        }}
      />
      <AuthModal store=authModalStore 
    </div>
  );
}

export default App;
