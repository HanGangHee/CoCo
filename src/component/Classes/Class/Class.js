/* */
import React from 'react'
import styles from './Class.scss'
import {Input, Button,Card, CardDeck,
    Modal, ModalHeader, ModalBody, ModalFooter,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Form, FormGroup} from 'reactstrap'
import client from '../../../redux/base.js'



class Class extends React.Component {

    constructor() {
        super()
    }

    _renderRow() {
        const row = this.props.data.map((colData) => {
            return <ColComponent colData = {colData} key = {colData.num}/>
        })
        return row
    }
    render() {
        return (
            <div className = {styles.classWrapper}>
                <CardDeck>
                    {this._renderRow()}
                </CardDeck>
            </div>
        )
    }
}
class  ColComponent extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            dropdownOpen:false,
            modalClass: false,
            modalUser: false,
            modalMatch: false,
            tutorInfo: {
                degree:'내용없음',
                github:'내용없음',
                intro:'내용없음',
                career:'내용없음',
            },
            classInfo: {
                content:'내용이 없습니다.',
                time:[]
            },
            body:{
                writer:this.props.colData.nickname,
                classNum:this.props.colData.num,
                day:'월',
                time:1
            }
        }
        this._toggleClass = this._toggleClass.bind(this)
        this._toggleDrop = this._toggleDrop.bind(this)
        this._toggleUser = this._toggleUser.bind(this)
        this._toggleMatch = this._toggleMatch.bind(this)
        this._getClassData = this._getClassData.bind(this)
        this._getTutorData = this._getTutorData.bind(this)
        this._renderTime = this._renderTime.bind(this)
        this._matching = this._matching.bind(this)
        this._handleDay = this._handleDay.bind(this)
        this._handleTime = this._handleTime.bind(this)


    }
    _handleDay(day){
        let _body = this.state.body
        _body.day = day
        this.setState({
            body:_body
        })
    }
    _handleTime(time) {
        let _body = this.state.body
        _body.time = time
        this.setState({
            body: _body
        })
    }

    _matching(){
        let _body = {...this.state.body}
        _body.time = _body.day + '' + _body.time
        delete _body.day
        console.log('_body', _body)
        console.log('body',this.state.body)
        client.post('api/board/request',_body).then(res => {
            console.log('완료')
            this._toggleMatch()
            this._toggleClass()
        }).then(error => {
            console.log(error)
        })
    }
    _renderTime(data){
        return(
            <div className={styles.timeWrapper}>
                <hr/>
                <div className={styles.time}>{data.day}</div>
                <div className={styles.time}>{data.startTime}</div>
                <div className={styles.time}>{data.endTime}</div>
            </div>
        )

    }

    _getClassData(){
        client.get('api/board/class/'+ this.props.colData.num).then(res =>{
            this.setState({
                classInfo:res.data.list
            },()=>{
                this._toggleClass()
            })
        }).catch(error =>{console.log(error)
            this._toggleClass()
        })
    }
    _getTutorData(){
        client.get('api/user/getTutor/'+this.props.colData.nickname).then(res => {
            this.setState({
                tutorInfo:res.data.tutor
            },()=>{
                this._toggleUser()
            })
        }).catch(error =>{console.log(error)
            this._toggleUser()
        })
    }

    _toggleClass() {
        this.setState({
            modalClass: !this.state.modalClass
        })
    }
    _toggleUser() {
        this.setState({
            modalUser: !this.state.modalUser
        })
    }
    _toggleMatch() {
        this.setState({
            modalMatch: !this.state.modalMatch
        })
    }
    _toggleDrop() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    render() {
        const colData = this.props.colData
        return (
            <div className={styles.cardWrapper}>
                <Card>
                    <div className={styles.classTitle} onClick={this._getClassData}>{colData.title}</div>
                    <div className={styles.classNickName} onClick={this._getTutorData}>
                        {colData.nickname}
                    </div>
                    <div className={styles.classLanguage}>Language | {colData.language}</div>
                </Card>

                <Modal isOpen={this.state.modalClass} toggle={this._toggleClass}>
                    <ModalHeader toggle={this._toggleClass} className = {styles.modalHeader}>{colData.title}</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <div className={styles.classBox}>
                            <span className={styles.labels}>강의 개설자 :</span><span className={styles.status}>{colData.status === 1? '학생':'튜터'}</span>
                        </div><hr/>

                        <div className={styles.classBox}>
                            <h4 className={styles.labels}>수업 내용</h4><br/>
                            <div className={styles.content}>{this.state.classInfo.content}</div><hr/>
                        </div>
                        <div className={styles.classBox}>
                            <h4 className={styles.labels}>수업 가능 시간</h4><br/><br/>
                            <div className={styles.timeHeaderWrapper}>
                                <div className={styles.timeHeader}>요일</div>
                                <div className={styles.timeHeader}>시작</div>
                                <div className={styles.timeHeader}>종료</div>
                            </div>
                            {this.state.classInfo.time.map((data) => {
                                return this._renderTime(data)
                            })}<hr/>
                        </div>

                        <div className={styles.classBox}>
                            <span className={styles.labels}>언어 :</span><span className={styles.language}>{colData.language}</span>
                        </div>
                    </ModalBody>

                    <Modal isOpen={this.state.modalMatch} toggle={this._toggleMatch}>
                        <ModalHeader toggle={this._toggleMatch} className={styles.nestedModalHeader}>매칭 신청 하기</ModalHeader>
                        <ModalBody className={styles.nestedModalBody}>
                            <div>
                                <div>시작 시간을 설정하세요</div><br/>
                                <Form inline>
                                    <FormGroup>

                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this._toggleDrop}>
                                            <DropdownToggle caret>
                                                {this.state.body.day}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('월')}>월</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('화')}>화</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('수')}>수</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('목')}>목</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('금')}>금</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('토')}>토</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('일')}>일</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                        <span>시간:</span>
                                        <Input type="number" onChange = {(e) => this._handleTime(e)} placeholder="1 ~ 24" />
                                    </FormGroup>
                                </Form>

                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this._matching}>매칭신청</Button>
                        </ModalFooter>
                    </Modal>

                    <ModalFooter>
                        <Button color="primary" onClick={this._toggleMatch}>{colData.status === 1? '튜터신청':'수강신청'}</Button>
                        <Button color="secondary" onClick={this._toggleClass}>취소</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalUser} toggle={this._toggleUser}>
                    <ModalHeader toggle={this._toggleUser} className = {styles.modalHeader}>튜터 소개</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <div className={styles.userBox}>
                            <label>튜터 소개</label><br/>
                            <div>{this.state.tutorInfo.intro}</div><hr/>
                        </div>
                        <div className={styles.userBox}>
                            <label>학위 정보</label><br/>
                            <div>{this.state.tutorInfo.degree}</div><hr/>
                        </div>
                        <div className={styles.userBox}>
                            <label>Github주소</label><br/>
                            <div>{this.state.tutorInfo.github}</div><hr/>
                        </div>
                        <div className={styles.userBox}>
                            <label>경력</label><br/>
                            <div>{this.state.tutorInfo.career}</div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._toggleUser}>확인</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Class
