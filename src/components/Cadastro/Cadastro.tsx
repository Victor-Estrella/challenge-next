import Image from 'next/image';
import Senha from "../../../public/img/lock.svg";
import Logo from "../../../public/img/logo_azul.png";
import Email from "../../../public/img/mail.svg";
import Phone from "../../../public/img/phone.svg";
import Calendario from "../../../public/img/calendario.svg";
import User from "../../../public/img/user.svg";
import { useState } from 'react';

export default function Cadastro({name, setName, email, setEmail, phone, setPhone, date, setDate, password, setPassword, errors, onLoginClick, onSubmit }: {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    date: string;
    setDate: (date: string) => void;
    password: string;
    setPassword: (password: string) => void;
    errors: { name?: string; email?: string; phone?: string; date?: string; password?: string };
    onLoginClick: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
    const [ageError, setAgeError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAgeError(null); // Resetar mensagem de erro

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

        onSubmit(e);
    };

    return (
        <section className="my-8 w-11/12 lg:flex items-center justify-center z-10 lg:w-full lg:flex-grow lg:my-0">
            <form action="#" className='h-full bg-branco flex items-center flex-col px-4 text-center drop-shadow-lg rounded-lg flex-grow' onSubmit={handleSubmit}>
                <div className="w-full flex justify-end mt-8">
                    <Image src={Logo} alt="Logo da Descomplica Auto" className='h-10 mb-6 mt-8 w-1/5' />
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
                            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Phone} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.phone ? 'border-red-500' : ''}`}
                            type="text" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                    <div className="bg-cinza flex items-center gap-2.5 pl-2.5 rounded-xl">
                        <Image src={Calendario} alt='' />
                        <input className={`border-none outline-none w-11/12 h-16 bg-transparent pl-2.5 text-2xl font-light lg:text-4xl text-preto ${errors.date ? 'border-red-500' : ''}`}
                            type="date" placeholder="Data de Nascimento" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    {errors.date && <p className="text-red-500">{errors.date}</p>}
                    
                    {ageError && <p className="text-red-500">{ageError}</p>} {/* Mensagem de erro de idade */}

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
