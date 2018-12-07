/**
 * @file 滚动列表包装器
 * @author Waifang
 */
import Scroller from './Scroller';

export default function scrollWrapper(pool) {
    return class extends Component {
        static template = `
            <div>
                <scroller
                    list="{= list =}"
                    loading="{= loading =}"
                    done="{= done =}"
                    on-load="loadPoolData"
                    >
                    <slot var-list="list"></slot>
                </scroller>
            </div>
        `;
        static components = {
            scroller: Scroller
        };
        static trimWhitespace = 'all';
        initData() {
            return {
                loading: false,
                done: false,
                list: []
            };
        }
        attached() {
            this.loadPoolData();
        }
        async loadPoolData() {
            this.data.set('loading', true);
            const {value, done} = await pool.next();
            this.data.set('loading', false);
            const list = this.data.get('list');
            if (list.length === 0 && value.length === 0) {
                return;
            }
            if (done) {
                this.data.set('done', true);
                return;
            }
            this.data.splice('list', [list.length, 0, ...value]);
        }
    };
}
