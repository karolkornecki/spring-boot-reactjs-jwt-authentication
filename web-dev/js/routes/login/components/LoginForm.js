import React from 'react'
import { Field } from 'redux-form';
import TextField from 'react-md/lib/TextFields';

const renderField = ({ title, input, label, type, name, meta: { touched, error, pristine } })=>(
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <TextField id={name} label={title} type={type}
                   error={touched && error}
                   errorText={error}
                   onChange={(value) => input.onChange(value)}/>

    </div>
);
//<input className="mdl-textfield__input" type={type} id={name} onChange={(value) => input.onChange(value)}/>
//<label className="mdl-textfield__label" htmlFor={name}>{title}</label>
export const LoginForm = ({ handleSubmit, submitting, invalid, submit})=>(
    <div className="mdl-layout mdl-js-layout mdl-color--grey-100 height-1000">
        <form onSubmit={handleSubmit(submit)}>
            <main className="mdl-layout__content">
                <div className="mdl-card mdl-shadow--6dp">
                    <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                        <h2 className="mdl-card__title-text">Login form</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <Field name="username" type="text" component={renderField} title="Username"/>
                        <Field name="password" type="password" component={renderField} title="Password"/>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                                type="submit" disabled={invalid || submitting}>
                            Log in
                        </button>
                    </div>
                </div>
            </main>
        </form>
    </div>
);