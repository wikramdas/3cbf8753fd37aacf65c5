import React, { Component } from 'react'
import { Dimensions, Text, View, TextInput, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgCssUri, SvgUri } from 'react-native-svg';
const win = Dimensions.get("window")
class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: props.route.params?.inputText ?? "",
            countriesArr: []
        }
    }

    componentDidMount() {
        let { inputText } = this.state
        fetch("https://restcountries.eu/rest/v2/name/" + inputText, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            // body: _body
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ countriesArr: responseJson })
            }).catch((error) => {

            })
    }
    Submit(capital) {
        this.props.navigation.navigate("CapitalWeather", { capital: capital })
    }
    render() {
        let { countriesArr } = this.state
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={countriesArr}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                key={index.toString()}
                                style={{
                                    borderWidth: 1, borderColor: "#ccc",
                                    borderRadius: 5, padding: 10,
                                    margin: 5
                                }}
                            >
                                <View style={{
                                    alignItems: "center", justifyContent: "center",
                                    borderRadius: 5, marginVertical: 5,
                                }}>
                                    <SvgCssUri
                                        width={Dimensions.get('window').width - 40} height="200"
                                        uri={item.flag}
                                    />
                                    {/* <Image style={{ width: "100%", height: 50, borderRadius: 5 }} source={{ uri: item.flag }} resizeMode="cover" /> */}
                                </View>
                                <View style={{ padding: 5 }}>
                                    <Text>Capital: {item.capital}</Text>
                                    <Text>Population: {item.population}</Text>
                                    <Text>Lat Long: {item.latlng[0]} - {item.latlng[1]}</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.9} disabled={this.state.inputText == "" ? true : false} style={{
                                    width: "100%", alignItems: "center", justifyContent: "center", padding: 10,
                                    backgroundColor: "#1D78E3", borderRadius: 5, marginVertical: 5
                                }}
                                    onPress={() => this.Submit(item.capital)}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Capital Weather</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    // ListHeaderComponent={() => this.renderHeader()}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

export default Countries
