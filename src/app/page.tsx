"use client"
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Cadastro from '../components/Cadastro/Cadastro';
import Login from '../components/Login/Login';
import Overlay from '../components/Overlay/Overlay';

export default function CadastroLogin() {
    const [rightPanel, setRightPanel] = useState<boolean>(true);
    const [mobileView, setMobileView] = useState<'Cadastro' | 'Login'>('Login');

    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [loginErrors, setLoginErrors] = useState<{ email?: string, password?: string }>({});

    const [registerName, setRegisterName] = useState<string>('');
    const [registerEmail, setRegisterEmail] = useState<string>('');
    const [registerPhone, setRegisterPhone] = useState<string>('');
    const [registerPassword, setRegisterPassword] = useState<string>('');
    const [registerErrors, setRegisterErrors] = useState<{ name?: string, email?: string, phone?: string, password?: string }>({});

    const router = useRouter();

    const registerButton = () => {
        setRightPanel(true);
    };

    const loginButton = () => {
        setRightPanel(false);
    };

    const validateLogin = (): boolean => {
        const errors: { email?: string, password?: string } = {};
        if (!loginEmail) errors.email = 'Email é obrigatório';
        if (!loginPassword) errors.password = 'Senha é obrigatória';
        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateRegister = (): boolean => {
        const errors: { name?: string, email?: string, phone?: string, password?: string } = {};
        if (!registerName) errors.name = 'Nome é obrigatório';
        if (!registerEmail) errors.email = 'Email é obrigatório';
        if (!registerPhone) errors.phone = 'Telefone é obrigatório';
        if (!registerPassword) errors.password = 'Senha é obrigatória';
        setRegisterErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateLogin()) {
            router.push('/funcionalidade');
        }
    };

    const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateRegister()) {
            router.push('/funcionalidade');
        }
    };

    const renderMobileView = () => {
        switch (mobileView) {
            case 'Cadastro':
                return (
                    <Cadastro
                        name={registerName}
                        setName={setRegisterName}
                        email={registerEmail}
                        setEmail={setRegisterEmail}
                        phone={registerPhone}
                        setPhone={setRegisterPhone}
                        password={registerPassword}
                        setPassword={setRegisterPassword}
                        errors={registerErrors}
                        onSubmit={handleRegisterSubmit}
                        onLoginClick={() => setMobileView('Login')}
                    />
                );
            case 'Login':
                return (
                    <Login
                        email={loginEmail}
                        setEmail={setLoginEmail}
                        password={loginPassword}
                        setPassword={setLoginPassword}
                        errors={loginErrors}
                        onSubmit={handleLoginSubmit}
                        onRegisterClick={() => setMobileView('Cadastro')}
                    />
                );
        }
    };

    return (
        <main className={`h-screen w-screen max-w-screen-min-2000 flex justify-center container ${rightPanel ? "right-panel-active" : ""}`} id="container">
            {/* Tela Mobile / Tablet */}
            <div className="lg:hidden w-full flex flex-col items-center mt-6">
                {renderMobileView()}
            </div>

            {/* Tela Desktop */}
            <div className="hidden lg:flex lg:w-screen">
                <Login
                    email={loginEmail}
                    setEmail={setLoginEmail}
                    password={loginPassword}
                    setPassword={setLoginPassword}
                    errors={loginErrors}
                    onSubmit={handleLoginSubmit}
                    onRegisterClick={registerButton}
                />
                <Cadastro
                    name={registerName}
                    setName={setRegisterName}
                    email={registerEmail}
                    setEmail={setRegisterEmail}
                    phone={registerPhone}
                    setPhone={setRegisterPhone}
                    password={registerPassword}
                    setPassword={setRegisterPassword}
                    errors={registerErrors}
                    onSubmit={handleRegisterSubmit}
                    onLoginClick={loginButton}
                />
                <Overlay
                    onLoginClick={() => setRightPanel(false)}
                    onRegisterClick={() => setRightPanel(true)}
                />
            </div>
        </main>
    );
}
