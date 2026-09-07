export default function MyResume ({first_name, last_name, createdAt, show, views, applies}) {   
    return (<div className="card mtb4">        
        <a className="h3">{first_name} {last_name}</a>        
        <p>Создан {createdAt}</p>            
        <h3>Статистика</h3>
        <div className="flex">            
            <a className="p3">{show} показов</a>
            <a className="p3">{views} просмотров</a>
            <a className="p3">{applies} присутствий</a>              
        </div>        
    </div>)
}