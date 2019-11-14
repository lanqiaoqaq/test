
import { observable,action } from 'mobx';

class store{
    @observable num = 1
    @action count(params) {
        this.num += params;
    }
}
export default new store();