import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CardContent from 'components/CardContent'
import Indicator from 'components/Indicator'
import LoginForm from './LoginForm'

import { loading } from 'store/indicator/action'
import delay from 'util/delay' 

const { width, height } = Dimensions.get('window')

class SettingsScreen extends React.Component {
  static propTypes = {
      navigation: PropTypes.object.isRequired
  }
  static navigationOptions = {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
  };

  async blah() {
      return await Promise.resolve(5)
  }

  handleSubmit = (form) => {
    console.log('FORM VALUES: ', form)
    const { email, password } = form
    const { navigation, loading } = this.props
    loading(true)

    delay(7000)
    .then(() => {
        loading(false)
        navigation.navigate('Home')
    })
  }

  renderIndicator() {
    return (
        <View style={{justifyContent: 'center', height: height - 200, backgroundColor: 'yellow'}}>
            <ActivityIndicator size={'large'} />
        </View>
    )
  }
  renderForm() {
    return <LoginForm handleSubmit={this.handleSubmit} />
  }

  render() {
      return (
          <View>
                { this.props.indicator.active ? <Indicator /> : this.renderForm() }
          </View>
      )
  }
}

const mapState = (state) => {
    return {
        form: state.form.login,
        indicator: state.indicator
    }
}

const mapAction = (dispatch) => ({
    loading: bindActionCreators(loading, dispatch)
})

export default connect(mapState, mapAction)(SettingsScreen)
