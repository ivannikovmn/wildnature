export default function MyResume ({item}) {
    return (<div className="card mtb4">        
        <a className="h3">{item.first_name} {item.last_name}</a>        
        <p>Создан {item.createdAt}</p>               
        <h3>Статистика</h3>
        <div className="flex">            
            <a className="p3">{item.stats.show} показов</a>
            <a className="p3">{item.stats.views} просмотров</a>
            <a className="p3">{item.stats.applies} присутствий</a>              
        </div>        
    </div>)
}