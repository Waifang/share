/**
 * @file 无限滚动
 * @author Waifang
 */

export default class Scroller extends Component {
    static template = `
        <div class="scroller">
            <ul>
                <slot></slot>
            </ul>
        <div>
    `;
    static trimWhitespace = 'all';
    initData() {
        return {
            loading: false,
            done: false
        };
    }
    attached() {
        document.addEventListener('scroll', () => {
            const listClientHeight = document.querySelector('.list').clientHeight;
            const topClientHeight = document.querySelector('.head').clientHeight;
            const clientHeight = listClientHeight + topClientHeight;
            const windowHeight = window.innerHeight;
            if (scrollY >= clientHeight - windowHeight) {
                const loading = this.data.get('loading');
                if (!loading) {
                    this.fire('load');
                }
            }
        });
    }
}
