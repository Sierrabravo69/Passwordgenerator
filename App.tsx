import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'

//Fomr Valitdation
import * as Yup from 'yup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,'Should of 4 char minimum')
  .max(16,'no Longer than 16 characters')
  .required('Length is required')
})

function App() {
  const [password, setPassword] = useState('')
  const [isPassGenrated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength:number)  => {
    let characterlist = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';
    if (upperCase) {
      characterlist+=upperCaseChars
      
    }
    
    if (numbers) {
      characterlist+=digitChars
      
    }
    if (symbols) {
      characterlist+=specialChars
      
    }
    if (lowerCase) {
      characterlist+=lowerCaseChars
      
    }

    const passwordResult = createPassword(characterlist,passwordLength)
    console.log("Password:",passwordResult);
    
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = ( characters: string,passwordLength: number) => {

    let result='';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }

    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }




  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
    <SafeAreaView style={styles.appContainer}>
    <View style={styles.formContainer}>
      <Text style={styles.title}>Password Generator</Text>
      <Formik
       initialValues={{ passwordLength:''}}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log('Values',{values});
        
        generatePasswordString(+values.passwordLength)
       }}
     >
       {({values, errors, touched, isValid, handleChange, handleSubmit, handleReset, /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength &&(
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='Ex. 8'
            keyboardType='numeric'/>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={lowerCase}
            onPress={() => setLowerCase(!lowerCase)}
            fillColor="#29AB87"
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase letters</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={upperCase}
              onPress={() => setUpperCase(!upperCase)}
              fillColor="#FED85D"
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
              fillColor="#C9A0DC"
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
              fillColor="#FC80A5"
            />
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => {
            handleReset();
            resetPasswordState()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>

        



        </>
       )}
     </Formik>
    </View>
    {isPassGenrated ? (
      <View style={[styles.card,styles.cardElevated]}>
        <Text style={styles.subTitle}>Result: </Text>
        <Text style={styles.description}>Long Press to copy</Text>
        <Text style={styles.generatedPassword}>{password}</Text>
      </View>
    ) :null}
    </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    // padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
    alignItems:'center',
    justifyContent:'center'
  },
  primaryBtnTxt: {
    color: '#fff',
    // textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
    alignItems:'center',
    justifyContent:'center'
  },
  secondaryBtnTxt: {
    color: '#fff',
    // textAlign: 'center',
    
    
    fontWeight: '700',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor:'#fff'
    
  },
  cardElevated: {
    backgroundColor: '#000',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
      
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#ffffff'
  },


})


export default App