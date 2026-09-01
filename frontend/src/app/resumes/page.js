import Header from '@/components/header'
import MyResumes from '@/components/myresumes'
export default function ResumePage() {  
  const resumes = [{
    first_name: "Mikhail",
    last_name: "Ivannikov",
    createdAt: "31.08.2026",
    stats: {
      views: 0,
      applies: 7,
      show: 0
    }
  }, 
  {
    first_name: "Михаил",
    last_name: "Иванников",
    createdAt: "01.09.2026",
    stats: {
      views: 100,
      applies: 2,
      show: 100
    }
  }]
  return (
    <main>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-js-sb ptb7'>
            <h1>Мои Резюме</h1>
            <button className='button button-secondary-bordered'>Создать резюме</button>
        </div>   
        
        <MyResumes resumes={resumes}/>  
      </div>
    </main>
  )
}