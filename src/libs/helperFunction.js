import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import { DATE_FORMAT_DDMMYYYY } from '../const/const'
dayjs.extend(utc)

export const getPeriodForRequest = (period) => {
  return {
    datetime_from: dayjs(period[0]).utc().format(),
    datetime_to: dayjs(period[1]).utc().format()
  }
}

export const beginToday = () => {
  return dayjs().startOf('d')
}

export const endTommorow = () => {
  return dayjs().add(1, 'days').endOf('d')
}

export const dateFormatDDMMYYYY = (date) => {
  return dayjs(date).format(DATE_FORMAT_DDMMYYYY)
}