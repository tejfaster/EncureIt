import React from 'react'
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

const Buttons = ({ onPress, text, style, txtstyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.button, style]}>
      <Text style={[txtstyle, styles.text]}>{text}</Text>
    </TouchableOpacity>
  )
}

const App = () => {
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false);
  const [fetchdata, setFetchdata] = React.useState(false);
  const [offset, setOffset] = React.useState(0)
  const [subdata, setSubData] = React.useState()
  const [detail, setDetail] = React.useState(false)
  const url = "https://machinetest.encureit.com/country.php"
  const formData = new FormData()
  formData.append("country", "India")

  React.useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      result.forEach(item => item.key = Math.floor(Math.random() * 1000))
      result.slice((offset * 12), (((offset + 1) * 25) - 1))
      //console.log(result.slice((offset * 12), (((offset + 1) * 12) - 1)))
      setOffset(offset + 1)
      setData(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(true)
    }
  }

  const loadData = () => {
    setFetchdata(true), async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData
        })
        const result = await response.json()
        result.forEach(item => item.key = Math.floor(Math.random() * 1000))
        result.slice((offset * 12), (((offset + 1) * 12) - 1))
        setOffset(offset + 1)
        setData(result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const footer = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => loadData()}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Loading</Text>
          {fetchdata ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    )
  }

  const Details = () => {
    return (
      <>
        {subdata ? <View style={{ padding: 20 }}><View style={styles.detailcontainer}>
          <Text style={styles.detailtext}>College Name :-</Text>
          <Text style={styles.detailtext}>{subdata.name}</Text>
          <Text style={styles.detailtext}>WebSite :-</Text>
          <Text style={styles.detailtext}>{subdata.web_pages}</Text>
          <Text style={styles.detailtext}>Country :-</Text>
          <Text style={styles.detailtext}>{subdata.country}</Text>

        </View></View> :
          <View style={{ marginTop: '60%' }}>
            <ActivityIndicator animating={true} size={"large"} />
          </View>
        }
      </>
    )
  }

  const handleSubmit = (item) => {
    setSubData(item)
    setDetail(true)
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={[styles.subcontainer, { backgroundColor: subdata && subdata.name === item.item.name ? "lightgrey" : "white" }]} onPress={() => handleSubmit(item.item)}>
        <View style={styles.circle}>
          <View style={styles.subcircle} >
            <View style={styles.internalcircle} />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={styles.txt}>
          {item.item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Buttons style={{ backgroundColor: detail ? "lightgrey" : "skyblue" }}
          txtstyle={{ color: detail ? "black" : "white" }}
          text="University List" onPress={() => setDetail(false)} />
        <Buttons style={{ backgroundColor: detail ? "skyblue" : "lightgrey" }}
          txtstyle={{ color: detail ? "white" : "black" }}
          text="Details" onPress={() => { setDetail(true) }} />
      </View>
      {
        isLoading ? detail ? <Details /> : <FlatList
          style={styles.flatlist}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          onEndReached={loadData}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => footer()}
        /> :
          <View style={{ marginTop: '60%' }}>
            <ActivityIndicator animating={true} size={"large"} />
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: '50%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "blue"
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  separator: {
    height: 0.5,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  subcontainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius:20
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 22
  },
  flatlist: {
    padding: 10
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: "gold",
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subcircle: {
    width: 14,
    height: 14,
    backgroundColor: "black",
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  internalcircle: {
    width: 8,
    height: 8,
    backgroundColor: "gold",
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailcontainer: {
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  detailtext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  }
})

export default App