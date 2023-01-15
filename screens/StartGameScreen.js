import { useState } from 'react'
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('')

  const { width, height } = useWindowDimensions()

  const numberInputHandler = (enteredtext) => {
    setEnteredNumber(enteredtext)
  }

  function resetInputHandler() {
    setEnteredNumber('')
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Number has to be a number between 1 and 99.',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetInputHandler,
          },
        ]
      )
      return
    }
    onPickNumber(chosenNumber)
  }

  const marginTopDistance = height < 380 ? 30 : 100
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={[styles.rootContainer, { margintTop: marginTopDistance }]}>
          <Title>Guess My Number </Title>
          <Card>
            <InstructionText> Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType='number-pad'
              autoCapitalize='none'
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <PrimaryButton onPress={resetInputHandler}>
                  {' '}
                  Reset{' '}
                </PrimaryButton>
              </View>
              <View style={styles.button}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen

//const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    width: 50,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
})
