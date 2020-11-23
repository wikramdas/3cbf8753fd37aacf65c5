import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
const win = Dimensions.get("window")
class CapitalWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capital: props.route.params?.capital ?? "",
            weatherArr: ""
        }
    }

    componentDidMount() {
        let { capital } = this.state
        if (capital != "") {
            fetch("http://api.weatherstack.com/current?access_key=21be2d81c07a09f8db4641a1ccd1422a&query=" + capital, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                // body: _body
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("===URL===", "http://api.weatherstack.com/current?access_key=21be2d81c07a09f8db4641a1ccd1422a&query=" + capital)
                    console.log("===responseJson===", responseJson)
                    this.setState({ weatherArr: responseJson })
                }).catch((error) => {

                })
        }
    }
    render() {
        let { weatherArr } = this.state
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ScrollView style={{ marginHorizontal: 10, margin: 5 }} contentContainerStyle={{ flex: 1 }}>
                    {weatherArr != "" &&
                        <View
                            style={{
                                borderWidth: 1, borderColor: "#ccc",
                                borderRadius: 5, padding: 5,
                                width: "100%",
                            }}
                        >
                            <View style={{
                                alignItems: "center", justifyContent: "center", marginTop: 5,
                                borderRadius: 5, marginVertical: 5
                            }}>
                                <Image style={{ width: "100%", height: 200, borderRadius: 5 }} source={{ uri: weatherArr.current.weather_icons[0] }} resizeMode="cover" />
                            </View>
                            <View style={{ padding: 5 }}>
                                <Text>Temperature: {weatherArr.current.temperature}</Text>
                                <Text>Wind Speed: {weatherArr.current.wind_speed}</Text>
                                <Text>Precip: {weatherArr.current.precip}</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

export default CapitalWeather
