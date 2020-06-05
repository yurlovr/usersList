import {BaseApi} from './BaseApi'

export default class Api extends BaseApi {

    static usersPath = 'users'
    static recharge = '/recharge'
    static transactions = '/transactions'


    static GetData(path, args, report) {
        if (args.user_id && !report) {
            path = path + '/' + args.user_id
        } else {
            path += BaseApi.createQueryString(args)
        }
        return this.Get(path)
    }

    static Users (args) {
        return this.GetData(this.usersPath, args)
    }

    static CreateUser (args) {
        return this.Post(this.usersPath, args)
    }

    static NewUserBalance (args) {
        const path = this.usersPath + '/' + args.user_id + this.recharge
        return this.Post(path, args)
    }

    static GetCurrentUser (args) {
        return this.GetData(this.usersPath, args);
    }

    static UpdateCurrentUser (args) {
        const path = this.usersPath + '/' + args.user_id
        return this.Put(path, args)
    }

    static GetReport(args) {
        const {user_id, report, ...params} = args
        const path = this.usersPath + '/' + user_id + this.transactions
        return this.GetData(path, params, report)
    }
}
