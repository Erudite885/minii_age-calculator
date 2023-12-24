import { FC, useEffect, useState } from 'react'

interface AgeCalculatorProps {}

// interface AgeFormProps {
//     onSubmit: (
//         day: number,
//         month: number,
//         year: number
//     ) => void
// }

const AgeForm: FC<AgeCalculatorProps> = () => {
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
      const [days, setDays] = useState<number | null>(null)
    const [months, setMonths] = useState<number | null>(null)
    const [years, setYears] = useState<number | null>(null)
    const [error, setError] = useState('')

    const calculateAge = () => {
        const currentDate = new Date()
        const dayNumber = parseInt(day)
        const monthNumber = parseInt(month)
        const yearNumber = parseInt(year) 
        const selectedDate = new Date(yearNumber, monthNumber - 1, dayNumber)

        const daysInMonth = (year: number, month: number) => {
            return new Date(year, month, 0).getDate()
        }

        if (dayNumber < 1 || dayNumber > 31 || monthNumber < 1 || monthNumber > 12 || selectedDate > currentDate) {
            setError('Invalid date')
            setYears(null)
            setMonths(null)
            setDays(null)
        } else {
            setError('')

            let yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear()
            let monthsDiff = currentDate.getMonth() - selectedDate.getMonth()
            let daysDiff = currentDate.getDate() - selectedDate.getDate()

            if (daysDiff < 0) {
                const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                daysDiff += daysInMonth(lastMonth.getFullYear(), lastMonth.getMonth() + 1)
                monthsDiff -= 1
            }

            if (monthsDiff < 0) {
                yearsDiff -= 1
                monthsDiff += 12
            }

            setYears(yearsDiff)
            setMonths(monthsDiff)
            setDays(daysDiff)

            // const diff = currentDate.getTime() - selectedDate.getTime()
            // const ageDate = new Date(diff)
            // setYears(ageDate.getUTCFullYear() - 1970)
            // setMonths(ageDate.getUTCMonth())
            // setDays(ageDate.getUTCDate() - 1)
        }
    }
    
    useEffect(() => {
      if (day && month && year && !error) {
        calculateAge()
      }
    
    }, [day, month, year, error])
    

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const intValue = parseInt(value, 10)
        
        if (name === 'day') {
            setDay(value)
        } else if (name === 'month') {
            setMonth(value)
        } else if (name === 'year') {
            setYear(value)
        }

        if (intValue >= 1 && intValue <= 31 && name === 'day') {
            setError('')
        } else if (intValue >= 1 && intValue <= 12 && name === 'month') {
           setError('')
        } else if (name === 'year') {
            setError('')
        } else {
            setError('Invalid Date')
        }

     

    }

  return (
      <section className='bg-amber-200 w-[80%] rounded-lg rounded-ee-[3rem] py-3'>
          {/* <p className='text-center'>Age Calculator */}
          <form action="">
              <div className='flex py-4 px-4 '>
                <div className={`flex flex-col gap-y-1  `}>
                    <label htmlFor="" className={`uppercase text-xs tracking-wider font-light ${error ? 'text-red-500' : ''}`}>Day</label>
                    <input name='day' type="number" value={day} onChange={inputChangeHandler} className={`font-bold px-2 py-1 ${error ? 'border-red-500' : ''}`} /> 
                </div>
                <div className={`flex flex-col gap-y-1 `}>
                    <label htmlFor="" className={`uppercase text-xs tracking-wider font-light ${error ? 'text-red-500' : ''}`}>Month</label>
                    <input name='month' type="number" value={month} onChange={inputChangeHandler} className={`font-bold px-2 py-1 ${error ? 'border-red-500' : ''}`} />
                </div>
                 <div className={`flex flex-col gap-y-1  `}>
                    <label htmlFor="" className={`uppercase text-xs tracking-wider font-light ${error ? 'text-red-500' : ''}`}>Year</label>
                    <input name='year' type="number" value={year} onChange={inputChangeHandler} className={`font-bold w-[75%] px-2 py-1  ${error ? 'border-red-500' : ''} `} />
                </div>
              </div>
              {error && <p className='text-red-500 text-xs px-4'>{ error}</p> }
          </form>
          
          {/* the circle */}
          {/* <div className='flex relative py-4 px-4'>
              <div className='border border-amber-300 w-full'></div>
              <div className='absolute w-[6%] bg-red-500 h-[8%] rounded-full'></div>
          </div> */}

          <div className='flex py-4 px-4'>
              <div className='font bold text-3xl'>
                  { error
                      ?
                        <p><span className='text-red-500'>_ _</span> Years <br /> <span className='text-red-500'>_ _</span> Months <br /> <span className='text-red-500'>_ _</span> Days  </p>
                      :
                        <p> <span className='text-amber-900'> {years} </span>years <br />  <span className='text-amber-900'> {months} </span> months <br />  <span className='text-amber-900'> {days}</span> days  </p>
                  }
              </div>
          </div>
    </section>
  )
}

export default AgeForm