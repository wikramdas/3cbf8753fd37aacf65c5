import React, { Component } from 'react'
import { Dimensions, Text, View, TextInput, TouchableOpacity } from 'react-native'
const win = Dimensions.get("window")
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ""
        }
    }

    componentDidMount() {
    }
    Submit() {
        let { inputText } = this.state
        if (inputText != "") {
            this.props.navigation.navigate("Countries", { inputText: inputText })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 10 }}>
                <TextInput
                    style={{
                        borderWidth: 1, borderColor: "#ccc",
                        borderRadius: 5, margin: 10, width: "100%",
                        padding: 15, fontSize: 18
                    }}
                    placeholder={"Enter country"}
                    value={this.state.inputText}
                    onChangeText={(inputText) => { this.setState({ inputText }) }}
                    autoCapitalize={"none"}
                    onSubmitEditing={() => { this.Submit() }}
                />
                <TouchableOpacity activeOpacity={0.9} disabled={this.state.inputText == "" ? true : false} style={{
                    width: "100%", alignItems: "center", justifyContent: "center", padding: 10,
                    backgroundColor: "#1D78E3", borderRadius: 5
                }}
                    onPress={() => this.Submit()}>
                    <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home
