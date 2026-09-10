"use client"

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createVacancy } from "@/app/store/slices/vacancySlice"
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false
});
import { useRouter } from 'next/navigation';

export default function CreateVacancy() {
const [name, setName] = useState("")    
const [about_company, setAbout_company] = useState("")  
const [description, setDescription] = useState("")  
const [event_date, setEvent_date] = useState("")
const [address, setAddress] = useState("")
const [branding_photo, setBrandingPhoto] = useState(null)

  const onLogoChange = (e) => {    
    setBrandingPhoto(e.target.files[0]);
  }

    const router = useRouter()
    const dispath = useDispatch()

    const handleSave = () => {        
        dispath(createVacancy({
            name,
            about_company,
            description,
            event_date,
            address,
            branding_photo
        }, router))
    } 

    return (
        <main>
            <Header />
            <div className="container p7">
                <h1>Создание мероприятия</h1>

                <fieldset className="fieldset-vertical">
                    <label>Название мероприятия</label>
                    <input className="input" placeholder="Введите название" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </fieldset>  

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Спикер</label>
                    <textarea
                        className="textarea"
                        placeholder=""
                        value={about_company}
                        onChange={(e) => setAbout_company(e.target.value)}
                        rows="5"
                    />
                </fieldset>                 

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Расскажите про мероприятие</label>

                    <div>
                        <Editor
                            data={description}
                            onChange={setDescription}
                        />                                              
                    </div>
                    
                </fieldset>  

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Дата</label>
                    <input className="input" placeholder="Введите дату" type="text" value={event_date} onChange={(e)=>setEvent_date(e.target.value)}/>
                </fieldset>                                 

                <fieldset className="fieldset-vertical">
                    <label>Адрес</label>
                    <input className="input" placeholder="Введите адрес" type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </fieldset>
                
                <fieldset className="fieldset-vertical">
                    <label>Фото</label>
                    <input type="file" placeholder="Фото бренда" onChange={onLogoChange}/>
                </fieldset>

                  <button className="button button-primary" onClick={handleSave}>Создать</button>

            </div>
        </main>
    )    
}