import React, { Component } from 'react';
import './index.less';

export default class Demo extends Component {
  state = {
    expand: false
  }

  switchExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  }

  render(){
    const { expand } = this.state;
    const { title, description, code, children } = this.props;
    
    return (
      <section className={expand ? 'code-box expand' : 'code-box'}>
        <section className='code-box-demo'>
          { children }
        </section>

        <section className='code-box-meta'>
          <div className='code-box-title'>
            <span>{title}</span>
          </div>
          <div>
            <p>{description}</p>
          </div>
          <span className='code-expand-icon' onClick={this.switchExpand}>
            <img alt='expand code' 
              src='https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg' 
              className={expand ? 'code-expand-icon-hide' : 'code-expand-icon-show'} />
            <img alt='expand code' 
              src='https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg' 
              className={expand ? 'code-expand-icon-show' : 'code-expand-icon-hide'} />
          </span>
        </section>
        <section className={expand ? 'highlight-wrapper highlight-wrapper-expand' : 'highlight-wrapper'}>
          <pre>
            <code className='css' dangerouslySetInnerHTML={{ __html: code }} />
          </pre>
        </section>
      </section>
    )
  }
}