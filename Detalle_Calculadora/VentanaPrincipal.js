import React, {Components} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class VentanaPrincipal extends Components{
    constructor(){
        super()
        this.state = {
            resultText: "",
            calculationText: ""
        }
        this.operations = ['C','+','-','*','/']
    }

    calculateResult(){
        const text = this.state.resultText
        console.log(text, eval(text))
        this.setState({
            calculationText: eval(text)
        })
        //eval(text)
    }

    validate(){
        const text=this.state.resultText
        switch(text.slice(-1)){
            case '+':
            case '-':
            case '*':
            case '/':
                return false
        }
        return true
    }

    buttonPressed(text){
        //console.log(text)
        if(text == '='){

            return this.validate() && this.calculateResult()
        }
        this.setState({
            resultText: this.state.resultText+text
        })
    }

    operate(operation){
        switch(operation){
            case 'C':
                console.log(this.state.resultText)
                let text = this.state.resultText.split('')
                text.pop()
                text.join('')
                this.setState({
                    resultText: text.join('')
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':
                const lastChar = this.state.resultText.split('').pop()
                
                if(this.operations.indexOf(lastChar)>0) return
                if(this.state.text=="") return 
                this.setState({
                    resultText: this.state.resultText+operation
                })


        }
    }

    render(){
        let rows = []
        let nums = [[1,2,3],[4,5,6],[7,8,9], ['.',0,"="]]
        for(let i= 0; i < 4; i++){
            let row = []
            for(let j = 0; j < 4; j++){
                row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
                    <Text style={styles.btntext}>{nums[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View key={i} style={styles.row}>{row}</View>)
        }

        
        let ops = []
        for(let i = 0; i < 5; i++){
            ops.push(<TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operations[i][j])}>
                <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
            </TouchableOpacity>)
        }

        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style= {styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>{this.state.calculationText}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1
    },
    resultText:{
        fontSize: 30,
        color: 'black'
    },
    btntext:{
        fontSize: 30,
        color: 'white'
    },
    white:{
        color: 'white'
    },
    btn:{
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    calculationText:{
        fontSize: 24,
        color: 'black'
    },
    row:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems:'center'
    },
    result:{
        flex: 2,
        backgroundColor: 'red',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    calculation:{
        flex: 1,
        backgroundColor: 'green',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    buttons:{
        flex: 7,
        flexDirection: 'row'
    },
    numbers:{
        flex: 3,
        backgroundColor: '#434343',
        color: 'white'
    },
    operations:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#636363'
    }
})

export default VentanaPrincipal;