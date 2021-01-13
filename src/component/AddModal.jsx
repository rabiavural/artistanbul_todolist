import { useState } from "react";


export function AddModal(props) {
    const showHideClassName = props.showModal ? "modal display-block" : "modal display-none";
    function handleClose() {
        props.setShowModal(false)
    }
    const [modalData, setModal] = useState({
        id: 0,
        date: null,
        value: "",
    })

    function saveAdd() {
        var idRandom = Math.floor(Math.random() * 101)
        setModal({ ...modalData, id: idRandom })
        if (modalData.value !== "" && modalData.date !== null) {
            var copyData = JSON.parse(JSON.stringify(props.todoList)) ? JSON.parse(JSON.stringify(props.todoList)) :[]
            if (props.returnData) {
                copyData.push(modalData);
                props.returnData(copyData);
                handleClose();
            }
        }else{
            alert("Please make sure all fields are filled.")
        }

    }
    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <p className="modal-text-title">Title</p>
                <input
                    type="text"
                    value={modalData.value}
                    onChange={e => setModal({ ...modalData, value: e.target.value })}
                    className="input-modal-text"
                />
                <p className="modal-text-date">Date</p>
                <input
                    type="date"
                    value={modalData.date}
                    onChange={e => setModal({ ...modalData, date: e.target.value })}
                    className="input-modal-text-2"
                />

                <button className="modal-button" onClick={handleClose}>Cancel</button>
                <button className="modal-button-save" onClick={saveAdd}>Save</button>
            </div>
        </div>
    )

}