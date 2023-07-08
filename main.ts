function control2 () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, V / 2)
    } else {
        PID()
    }
}
function PID () {
    E = maqueen.readPatrol(maqueen.Patrol.PatrolLeft) - maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    cuE = cuE + E
    dE = E - preE
    preE = E
    VD = P * E + I * cuE + D * dE
    VL = V + VD
    VR = V - VD
    activate()
}
IR.IR_callbackUser(function (message) {
    if (message == 1) {
        Mode = 1
    } else {
        Mode = 0
    }
})
function activate () {
    if (VL < 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, VL * -1)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, VL)
    }
    if (VR < 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, VR * -1)
    } else {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, VR)
    }
}
let Mode = 0
let VR = 0
let VL = 0
let VD = 0
let dE = 0
let E = 0
let preE = 0
let cuE = 0
let D = 0
let I = 0
let P = 0
let V = 0
V = 100
P = 50
I = 5
D = 0
cuE = 0
preE = 0
basic.forever(function () {
    if (Mode == 1) {
        control2()
        basic.pause(100)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
