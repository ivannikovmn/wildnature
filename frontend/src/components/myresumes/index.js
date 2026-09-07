import MyResume from "./myresume"; 
    export default function MyResumes ({resumes}) {          
    const showResumes = resumes.map(item => 
        (<MyResume first_name={item.first_name} 
                   last_name={item.last_name} 
                   createdAt={item.createdAt} 
                   show={0} 
                   views={0} 
                   applies={0}
                   key={item.id}
                   />));        

    return (<div>
        {showResumes}
    </div>)
}