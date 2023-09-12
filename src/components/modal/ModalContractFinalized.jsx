import React from 'react'

export const ModalContractFinalized = (isOpen, setOpen) => {

    if (isOpen) {
        return (
            <div>
                <div>
                    <h2>Contrato Finalizado com Sucesso!</h2>
                    <button>Ir para o Início</button>
                    <button>Meus contratos</button>
                </div>
            </div>
        )
    } else {
        return <></>
    }

}
