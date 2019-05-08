import React, {Component} from 'react';

import './index.scss';
import Buttons from './Buttons';
import List from './List';

class App extends Component {

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <h3>wanted-<code>CODE</code>-test</h3>
                </header>
                <Buttons/>
                <List/>
            </div>
        );
    }
}

export default App;
