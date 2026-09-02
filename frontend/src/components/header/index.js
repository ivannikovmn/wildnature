import Image from 'next/image'
import logo from '../../app/images/logo.png'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div>                       
                        <Link href="/">
                            {/* <img src="/images/logo.png" />*/}
                            <Image src={logo} alt="WildNature Volunteers" />                               
                        </Link>                                                  
                        {/* <a>Менеджерам<</a> */}
                        <Link href="/resumes">Мои резюме</Link>                                                
                    </div>

                    <div>
                        <Link className="header-button header-button--green" href="/create-resume">
                            Создать резюме                                                    
                        </Link>   
                        <Link className="header-button" href="/login">
                            Войти
                        </Link>      
                    </div>
                </div>
            </div>
        </header>
    )
}