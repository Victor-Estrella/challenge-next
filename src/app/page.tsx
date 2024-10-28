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
    const [registerDate, setRegisterDate] = useState<string>('');
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
        const errors: { name?: string, email?: string, phone?: string, date?: string, password?: string } = {};
        
        if (!registerName) errors.name = 'Nome é obrigatório';
        if (!registerEmail) errors.email = 'Email é obrigatório';
        if (!registerPhone) errors.phone = 'Telefone é obrigatório';
        if (!registerDate) errors.date = 'Data de Nascimento é obrigatória';
        if (!registerPassword) {
            errors.password = 'Senha é obrigatória';
        } else if (registerPassword.length < 9) {
            errors.password = 'A senha deve ter pelo menos 9 caracteres';
        }
        
        setRegisterErrors(errors);
        return Object.keys(errors).length === 0;
    };
    

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateLogin()) {
            try {
                const response = await fetch('http://localhost:8080/cadastro');
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
    
                const users = await response.json();
                // Verificar se há um usuário com o email e senha fornecidos
                const matchedUser = users.find((user: { email: string, senha: string }) =>
                    user.email === loginEmail && user.senha === loginPassword
                );
    
                if (matchedUser) {
                    // Redireciona para a página /funcionalidades se o login for bem-sucedido
                    router.push('/funcionalidade');
                } else {
                    // Exibe uma mensagem de erro
                    setLoginErrors({ email: 'Email ou senha incorretos', password: 'Email ou senha incorretos' });
                }
            } catch (error) {
                console.error('Erro ao realizar o login:', error);
            }
        }
    };
    

    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateRegister()) {
            const cadastroData = {
                nomeCompleto: registerName,
                email: registerEmail,
                numeroTelefone: registerPhone,
                dataNascimento: registerDate,
                senha: registerPassword,
            };
    
            try {
                const response = await fetch('http://localhost:8080/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cadastroData),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Erro ao cadastrar:', errorData);
                    throw new Error(`Erro ao cadastrar: ${errorData.message || response.statusText}`);
                }
    
                await response.json();
                router.push('/funcionalidade');
            } catch (error) {
                console.error('Erro ao cadastrar:', error);
            }
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
                        date={registerDate}
                        setDate={setRegisterDate}
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
                    date={registerDate}
                    setDate={setRegisterDate}
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