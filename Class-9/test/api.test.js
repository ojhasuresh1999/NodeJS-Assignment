let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Api',()=>{
    it("should return 200 for health Check",(done)=>{
        chai.request(`http://localhost:9700`)
        .get('/health')
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        })
        .catch((err)=>{
            throw err;
        })
    })
    it("should return 200 for health Check",(done)=>{
        chai.request(`http://localhost:9700`)
        .get('/users')
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        })
        .catch((err)=>{
            throw err;
        })
    })
    it("should return 404 for user not found",(done)=>{
        chai.request(`http://localhost:9700`)
        .get('/user')
        .then((res)=>{
            expect(res).to.have.status(404);
            done();
        })
        .catch((err)=>{
            throw err;
        })
    })
    it("should insert user into mongodb",(done)=>{
        chai.request(`http://localhost:9700`)
        .post('/addUser')
        .send({'name':'Test User','isActive':true})
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        })
        .catch((err)=>{
            throw err;
        })            
    })
    it("should update users ",(done)=>{
        chai.request(`http://localhost:9700`)
        .put('/updateUser')
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        })
        .catch((err)=>{
            throw err;
        })
    })
    it("should Delete user from Mongodb",(done)=>{
        chai.request(`http://localhost:9700`)
        .delete('/deleteUser')
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        })
        .catch((err)=>{
            throw err;
        })
    })
    it("should return 404 not found",(done)=>{
        chai.request(`http://localhost:9700`)
        .delete('/deleteUsers')
        .then((res)=>{
            expect(res).to.have.status(404);
            done();
        })
        .catch((err)=>{
            throw err;
        })
    })
})
