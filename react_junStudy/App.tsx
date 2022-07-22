import React from 'react';
import './App.css';
import { useState } from 'react';
/* iPhoneの電卓に似せる形で作ったので、比べてみて */

/*　Stackを使おうと考えたが、やめた。一応残しときます。 */
/*
class Item<T> {

  private _value: T;
  get value(): T {
    return this._value;
  }
  set value(value: T) {
    this._value = value;
  }

  private _prevItem: Item<T> | null;
  get prevItem(): Item<T> | null {
    return this._prevItem;
  }
  set prevItem(value: Item<T> | null) {
    this._prevItem = value;
  }

  constructor(data: T) {
    this._value = data;
    this._prevItem = null;
  }
}

class Stack<T> {

  private _size: number = 0;
  get size(): number {
    return this._size;
  }
  set size(value: number) {
    this._size = value;
  }

  private _top: Item<T> | null;
  get top(): Item<T> | null {
    return this._top;
  }
  set top(value: Item<T> | null) {
    this._top = value;
  }

  constructor() {
    this._size = 0;
    this._top = null;
  }

  push(item: Item<T>) {
    this._size++;
    item.prevItem = this._top;
    this._top = item;
  }

  pop() {
    if (this._top === null) {
      return null;
    }
    else {
      const top = this._top;
      this._top = this._top.prevItem;
      this._size--;
      return top;
    }
  }

  clear() {
    this._size = 0;
    this._top = null;
  }
}
*/

/* 電卓の数字部品 */
type item = {
  id: number;
  value: string;
}

/* 電卓の演算部品 */
type calc = {
  id: number;
  value: string;
}

/* グローバル変数 */
let firstNum: number = 0;
let whatCalc: string = '';

function App() {
  /* 数字セット */
  const items: item[] = [
    { id: 1, value: '1' },
    { id: 2, value: '2' },
    { id: 3, value: '3' },
    { id: 4, value: '4' },
    { id: 5, value: '5' },
    { id: 6, value: '6' },
    { id: 7, value: '7' },
    { id: 8, value: '8' },
    { id: 9, value: '9' },
    { id: 10, value: '0' },
    { id: 11, value: '.' },
  ]

  /* 演算セット */
  const calcs: calc[] = [
    { id: 1, value: '+' },
    { id: 2, value: '-' },
    { id: 3, value: '×' },
    { id: 4, value: '÷' },
  ]

  const [num, setNum] = useState('0')

  /* 数字、演算、イコールのボタンが「使える状態かどうか」という意図で名前付けしたため
     初期値はtrueにしてdisabled={!is...}という形で記述している (他の人と逆で記述しているので注意してね)) */
  const [isUseCalc, setUseCalc] = useState(true)
  const [isUseNum, setUseNum] = useState(true)
  const [isUseEq, setUseEq] = useState(true)

  /* 表示部を変更する際のトリガーとして用意 */
  const [changeTrigger, setTrigger] = useState(false)

  const handleNumClick = (value: string) => {
    /* 演算ボタン => 数字ボタン の順で押したときの処理 */
    if (changeTrigger) {
      if (value === '.') {
        setNum('0.')
      } else {
        setNum(value)
      }
      setTrigger(false)
    }
    /* それ以外 */
    else {
      /* 表示が '0' かつ入力が '.' 以外の時はvalueをそのまま表示 */
      if (num === '0' && value !== '.') {
        setNum(value)
      }
      else {
        let val: string = num;
        /* 表示に小数点を1つだけ表示するための処理 */
        /* str1.indexOf(str2) はstr1にstr2が含まれていなければ -1 を返すため、 -1 をビット反転(~)すると 0 になることを利用している*/
        /* 入力が '.' かつ表示に '.' が含まれるとき時 */
        if (value === '.' && ~num.indexOf('.')) {
          setNum(val)
        }
        /* 入力が '0'~'9'はもちろん、入力が '.' かつ表示に '.' が含まれていない時 */
        else {
          val += value
          setNum(val)
        }
      }
    }
    setUseEq(true)
  }

  const handleCalcClick = (value: string) => {
    /* 演算ボタンが押されるごとにfirstNumを更新する処理 */
    if (whatCalc === '+') {
      firstNum += Number(num)
    }
    else if (whatCalc === '-') {
      firstNum -= Number(num)
    }
    else if (whatCalc === '×') {
      firstNum *= Number(num)
    }
    else if (whatCalc === '÷') {
      firstNum /= Number(num)
    }
    /* 一番最初に演算ボタンが押された際、 whatCalc はどの演算子も含んでいないため、 num を firstNum に代入する */
    else {
      firstNum = Number(num)
    }
    whatCalc = value
    setNum(firstNum.toPrecision())
    setTrigger(true)
    setUseEq(false)
  }

  const handleClearClick = () => {
    /* クリアボタンが押されたときは全て初期化 */
    setNum('0')
    firstNum = 0
    whatCalc = ''
    setUseCalc(true)
    setUseNum(true)
    setTrigger(false)
    setUseEq(true)
  }

  const handleEqClick = () => {
    /* 集まってコード書いた時とほぼ変えてないはず */
    let ans: number
    if (num === '0') {
      setNum('0')
    }
    else if (num !== '0' && whatCalc === '') {
      setNum(num)
    }
    else {
      if (whatCalc === '+') {
        ans = firstNum + Number(num)
        setNum(ans.toPrecision())
      }
      if (whatCalc === '-') {
        ans = firstNum - Number(num)
        setNum(ans.toPrecision())
      }
      if (whatCalc === '×') {
        ans = firstNum * Number(num)
        setNum(ans.toPrecision())
      }
      if (whatCalc === '÷') {
        ans = firstNum / Number(num)
        setNum(ans.toPrecision())
      }
    }
    whatCalc = ''
    firstNum = 0
    setUseNum(false)
    setUseEq(false)
    setTrigger(false)
  }
  /* TSX?JSX?内で直接if文とか書けないから、即時関数を通して間接的にif文を使用している */
  /* 即時関数 : (() => {})() みたいに書かれているやつ。269-291行 が即時関数にあたる。 */
  /* 豆知識 : 「useStateの値が更新されるのは処理が終わった後」らしいので、処理途中で更新しようとしている値を参照しようとしても実際は変わらないことがあるらしい */
  /* ex) 更新前の num='5', value='3'だとする。
    const func = (value: string) => {
      setNum('1') <- num の更新処理
      let val: string = num <- この時点ではまだ num は更新されないので、 val には '5' が入る
      val += value <- '5' の文字列に '3' を結合しようとする
      setNum(val)　<- 結果、 '53'が num に更新処理
    } <- ここで num がやっと更新される
  */
  return (
    <div className="App">

      <h1>電卓</h1>

      <input
        type="text"
        className='inputText'
        value={num}
        disabled
      />
      <div className="btn">
        {items.map((item) => (
          <input
            type="button"
            className='number2'
            value={item.value}
            onClick={() => handleNumClick(item.value)}
            disabled={!isUseNum}
          />
        ))}
      </div>

      <div className="btn">
        {calcs.map((calc) => (
          (() => {
            if (whatCalc === calc.value) {
              return (
                <input
                  type="button"
                  className='number1'
                  value={calc.value}
                  onClick={() => handleCalcClick(calc.value)}
                  disabled={!isUseCalc}
                />
              );
            } else {
              return (
                <input
                  type="button"
                  className='number'
                  value={calc.value}
                  onClick={() => handleCalcClick(calc.value)}
                  disabled={!isUseCalc}
                />
              );
            }
          })()
        ))}
      </div>

      <div className="btn">
        <input
          type="button"
          className='number'
          value="C"
          onClick={() => handleClearClick()}
        />
        <input
          type="button"
          className='number'
          value="="
          onClick={() => handleEqClick()}
          disabled={!isUseEq}
        />
      </div>

    </div>
  );
}

export default App;
