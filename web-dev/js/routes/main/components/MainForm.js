import React from 'react';

export const MainForm = ( {firstName, lastName, logout } )=>(
    <div className="mdl-layout mdl-js-layout mdl-color--grey-100 height-1000">
        <main className="mdl-layout__content">
            <div className="mdl-card mdl-shadow--6dp">
                <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                    <h2 className="mdl-card__title-text">Welcome</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {firstName}&nbsp;{lastName}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                            onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </main>
    </div>
);