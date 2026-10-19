"use client"

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import dynamic from "next/dynamic"
import { useRouter, useParams } from "next/navigation"
import { getVacancyById, editVacancy } from "@/app/store/slices/vacancySlice"
import { END_POINT } from "@/config/end-point"

const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false
})

function EditVacancyForm({ vacancy, router, dispatch }) {
    const [name, setName] = useState(vacancy.name ?? "")
    const [about_company, setAbout_company] = useState(
        vacancy.about_company ?? ""
    )
    const [description, setDescription] = useState(
        vacancy.description ?? ""
    )
    const [event_date, setEvent_date] = useState(() => {
        if (!vacancy.event_date) return ""

        return new Intl.DateTimeFormat("sv-SE", {
            timeZone: "Asia/Almaty",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        })
            .format(new Date(vacancy.event_date))
            .replace(" ", "T")
    })
    const [address, setAddress] = useState(vacancy.address ?? "")
    const [branding_photo, setBrandingPhoto] = useState(null)

    const onLogoChange = (e) => {
        setBrandingPhoto(e.target.files[0] ?? null)
    }

    const handleSave = () => {
        dispatch(editVacancy({
            id: vacancy.id,
            name,
            about_company,
            description,
            event_date,
            address,
            branding_photo
        }, router))
    }

    return (
        <div className="container p7">
            <h1>Создание мероприятия</h1>

            <fieldset className="fieldset-vertical">
                <label>Название мероприятия</label>
                <input
                    className="input"
                    placeholder="Введите название"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <div className="editor-field">
                    <Editor
                        data={description}
                        onChange={setDescription}
                    />
                </div>
            </fieldset>

            <fieldset className="fieldset-vertical fieldset-md">
                <label>Дата и время</label>
                <input
                    className="input"
                    type="datetime-local"
                    value={event_date}
                    onChange={(e) => setEvent_date(e.target.value)}
                />
            </fieldset>

            <fieldset className="fieldset-vertical">
                <label>Адрес</label>
                <input
                    className="input"
                    placeholder="Введите адрес"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </fieldset>

            <fieldset className="fieldset-vertical">
                <label>Фото</label>

                {vacancy.branding_photo && (
                    <img
                        src={`${END_POINT}${vacancy.branding_photo}`}
                        alt={vacancy.name ?? "Фото мероприятия"}
                        style={{ maxWidth: "300px" }}
                    />
                )}

                <input
                    type="file"
                    onChange={onLogoChange}
                />
            </fieldset>

            <button
                className="button button-primary"
                onClick={handleSave}
            >
                Сохранить
            </button>
        </div>
    )
}

export default function EditVacancy() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { id } = useParams()
    const vacancy = useSelector((state) => state.vacancy.vacancy)

    useEffect(() => {
        dispatch(getVacancyById(id))
    }, [dispatch, id])

    const isCorrectVacancy =
        vacancy.id != null && String(vacancy.id) === String(id)

    return (
        <main>
            <Header />

            {isCorrectVacancy ? (
                <EditVacancyForm
                    key={String(vacancy.id)}
                    vacancy={vacancy}
                    router={router}
                    dispatch={dispatch}
                />
            ) : (
                <div className="container p7">
                    <p>Загрузка мероприятия...</p>
                </div>
            )}
        </main>
    )
}