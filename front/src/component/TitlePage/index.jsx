import './index.css'

export default function titlePage({ title, subtitle }) {
    return (
        <div className="title-page">
            <h1 className="title-page__title">{title}</h1>
            <h3 className="title-page__subtitle">{subtitle}</h3>
        </div>
    )
}