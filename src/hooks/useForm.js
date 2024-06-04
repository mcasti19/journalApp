import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [formState, setFormState] = useState( initialForm );
    const [formValidation, setFormValidation] = useState( {} );

    useEffect( () => {
        createValidator();
    }, [formState] )


    //! ESTE EFECTO SE ENCARGA DE MOSTRAR EL CAMBIO AL HACER CLICK EN LAS NOTAS, CUANDO EL INICIALFORM CAMBIA
    //! SE ACTUALIZA EL INICIALFORM CON EL NUEVO VALOR (EL DE LA NUEVA NOTA CLICKEADA)
    useEffect( () => {
        setFormState( initialForm )
    }, [initialForm] )


    const isFormValid = useMemo( () => {

        for ( const formValue of Object.keys( formValidation ) ) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [formValidation] )


    const onInputChange = ( { target } ) => {
        const { name, value } = target;
        setFormState( {
            ...formState,
            [name]: value
        } );
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidator = () => {

        const formCheckedValues = {}

        for ( const formField of Object.keys( formValidations ) ) { //TODO IMPORTANTE VER PARA ENTENDER MEJOR: https://prnt.sc/Y5NfsbbUG9d5
            // console.log( formField );
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        setFormValidation( formCheckedValues ); // console.log( formCheckedValues );

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}