import Image from 'next/image'
import logo from '../../app/images/logo.png'

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div>
                        {/* <img src="/images/logo.png" />                      */}
                        <Image src={logo} alt="WildNature Volunteers" />                           
                        <a>Менеджерам</a>
                        {/* <a>Помощь</a> */}
                    </div>

                    <div>
                        <button className="header-button header-button--green">
                            Создать резюме
                        </button>
                        <button className="header-button">
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}