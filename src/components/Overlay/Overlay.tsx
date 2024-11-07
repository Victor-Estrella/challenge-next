import './overlay.css';

export default function Overlay({
    onLoginClick,
    onRegisterClick
}: {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}) {
    return (
        <div className="overlay-container hidden lg:block">
        <div className="overlay bg-azulclaro bg-no-repeat bg-cover bg-[0_0] text-branco relative -left-full h-full w-[200%]">
            <div className="overlay-panel overlay-left">
                <h1 className="text-5xl font-bold mb-8 text-branco m-0">Bem vindo de volta!</h1>
                <p className='text-branco text-lg'>Para se manter conectado conosco por favor faça login com suas informações</p>
                <button className="mt-10 rounded-full border border-white bg-transparent text-white text-2xl font-bold my-2 px-20 py-3 tracking-wide capitalize transition duration-300 ease-in-out hover:tracking-wider active:scale-95 focus:outline-none" onClick={onLoginClick}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
                <h1 className="text-5xl font-bold mb-8 text-branco m-0">Seja bem vindo!</h1>
                <p className='text-branco text-lg'>Caso não possua uma conta, faça seu cadastro clicando no botão abaixo</p>
                <button className="mt-10 rounded-full border border-white bg-transparent text-white text-2xl font-bold my-2 px-20 py-3 tracking-wide capitalize transition duration-300 ease-in-out hover:tracking-wider active:scale-95 focus:outline-none" onClick={onRegisterClick}>Cadastrar</button>
            </div>
        </div>
    </div>
    );
}