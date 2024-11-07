import Image from 'next/image';
import Senha from "../../../public/img/lock.svg";
import Logo from "../../../public/img/logo_azul.png";
import Email from "../../../public/img/mail.svg";
import Phone from "../../../public/img/phone.svg";
import Calendario from "../../../public/img/calendario.svg";
import Casa from "../../../public/img/home.svg";
import User from "../../../public/img/user.svg";
import { useState } from 'react';

export default function Cadastro({name, setName, email, setEmail, phone, setPhone, cep, setCep, date, setDate, password, setPassword, errors, onLoginClick, onSubmit }: {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    cep: string;
    setCep: (cep: string) => void;
    date: string;
    setDate: (date: string) => void;
    password: string;
    setPassword: (password: string) => void;
    errors: { name?: string; email?: string; phone?: string; cep?: string; date?: string; password?: string };
    onLoginClick: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
    const [ageError, setAgeError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [cepError, setCepError] = useState<string | null>(null);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numero = e.target.value.replace(/\D/g, '');
        numero = numero.replace(/(\d{2})(\d)/, "$1 $2");
        numero = numero.replace(/(\d{2})(\d)/, "($1) $2");
        numero = numero.replace(/(\d)(\d{4})$/, "$1-$2");
        setPhone(numero);
    };

    const validateEmail = (value: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(value.trim());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numero = e.target.value.replace(/\D/g, '');
        numero = numero.replace(/(\d{5})(\d)/, '$1-$2'); 
        setCep(numero);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAgeError(null);
        setPhoneError(null); // Limpa a mensagem de erro do telefone antes da validação
        setCepError(null); // Limpa a mensagem de erro do CEP antes da validação

        // Verificar idade
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const isAdult = age > 18 || (age === 18 && monthDiff >= 0);

        if (!isAdult) {
            setAgeError("Você precisa ter pelo menos 18 anos para se cadastrar.");
            return;
        }

        // Validação do telefone ao submeter o formulário
        if (phone.replace(/\D/g, '').length < 11) { 
            setPhoneError("Telefone inválido. Deve ter 13 dígitos.");
            return;
        }

        // Validação do CEP ao submeter o formulário
        if (cep.replace(/\D/g, '').length !== 8) { // Verifica se o CEP contém 8 dígitos
            setCepError("CEP inválido. Deve ter 8 dígitos.");
            return;
        }

        // Validação do email ao submeter o formulário
        if (!validateEmail(email)) {
            errors.email = 'Email inválido';
            return;
        } else {
            delete errors.email;
        }

        onSubmit(e);
    };
    

    return (
        <section className="my-8 w-11/12 lg:flex items-center justify-center z-10 lg:w-full lg:flex-grow lg:my-0">
            <form action="#" className='h-full bg-branco flex items-center flex-col px-4 text-center drop-shadow-lg rounded-lg flex-grow' onSubmit={handleSubmit}>
                <div className="w-full flex justify-end mt-8">
                    <Image src={Logo} alt="Logo da Descomplica Auto" className='h-10 mb-6 mt-8 w-1/2 md:w-1/3 lg:w-1/5'/>
                </div>
                <h1 className='text-4xl mt-2 lg:my-10 font-bold text-azulclaro m-0 md:text-6xl lg:text-7xl'>Cadastro</h1>
                <div className="flex flex-col gap-2 mt-5">
                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={User} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.name ? 'border-red-500' : ''}`}
                            type="text" placeholder="Nome Completo" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    {errors.name && <p className="text-red-500">{errors.name}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Email} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.email ? 'border-red-500' : ''}`}
                            type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
                    </div>
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Phone} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.phone ? 'border-red-500' : ''}`}
                            type="text" placeholder="Telefone" value={phone} onChange={handlePhoneChange} maxLength={18}/>
                    </div>
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                    {phoneError && <p className="text-red-500">{phoneError}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Casa} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.cep ? 'border-red-500' : ''}`}
                            type="text" placeholder="CEP" value={cep} onChange={handleCepChange} maxLength={9}/>
                    </div>
                    {errors.cep && <p className="text-red-500">{errors.cep}</p>}
                    {cepError && <p className="text-red-500">{cepError}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Calendario} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent text-gray-400 pl-2.5 text-2xl font-light lg:text-4xl ${errors.date ? 'border-red-500' : ''}`}
                            type="date" placeholder="Data de Nascimento" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    {errors.date && <p className="text-red-500">{errors.date}</p>}                    
                    {ageError && <p className="text-red-500">{ageError}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Senha} alt='' />
                        <input className={`border-none outline-none w-full h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.password ? 'border-red-500' : ''}`}
                            type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password}</p>}                    
                </div>

                <div className="mt-5">
                    <button type="submit" className="bg-azulescuro p-6 text-branco font-bold text-2xl rounded-3xl md:text-3xl md:px-12 lg:text-4xl">Cadastrar</button>
                </div>

                <div className="mt-5">
                    <button type="button" className="text-azulclaro font-bold text-xl lg:hidden" onClick={onLoginClick}>Já tenho conta</button>
                </div>
            </form>
        </section>
    );
}
