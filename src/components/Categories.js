import React, { useState } from 'react'

const Categories = ({categories, onClick, addCategory}) => {
    const [add, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const renderItem = () => categories.map(category => (
        <li className="nav-item" key={category.id}>
            <a className="nav-link" href="#" onClick={() => onClick(category.id)}>{category.title}</a>
        </li>
    ));

    return (
        <ul className="nav justify-content-center">
            <li className="nav-item" key={-1}>
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Categories:</a>
            </li>
            { renderItem() }
            {
                add ?
                    <li className="nav-item" key={-1}>
                        <a className="nav-link" href="#">
                            <input className="form-control form-control-sm" onInput={(ev) => setTitle(ev.target.value)}/>
                        </a>
                    </li>
                :   
                    ''
            }
            {
                add ?
                    <li className="nav-item" key={-3}>
                        <a className="nav-link" href="#" onClick={(ev) => {
                            addCategory(title.trim());
                            setEdit(false);
                        }}>
                            save
                        </a>
                    </li>
                : 
                    ''
            }
            <li className="nav-item" key={-2}>
                {
                    add ? 
                        <a className="nav-link" href="#" onClick={() => setEdit(false)}>
                            <i class="fas fa-times"></i>
                        </a>
                    : 
                        <a className="nav-link" href="#" onClick={() => setEdit(true)}>
                            <i class="fas fa-plus"></i>
                        </a>
                }
            </li>
        </ul>
    )
}

export default Categories
