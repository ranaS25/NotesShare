import React from "react"

class AboutClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            name: 'default'
        };
    }
    render() {
        // console.log(`aboutClass rendered count ${this.state.count}`);
        return (
            <div className="card-cont" style={{padding: '24px', border: "1px solid black"}}>
                <h2>Card</h2>
                <p>description</p>
                <button type="button" onClick={() => {
                    this.setState({ count: this.state.count + 1 })
                }}>Increment</button>
            </div>
        )
    }
}


export default AboutClass;