module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
      ],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",    
    collectCoverageFrom: [
    "**/*.(t|j)s"
    ],
    coverageDirectory: "./coverage",
    "moduleNameMapper": {
        "^src/(.*)$": "<rootDir>/$1"
      }
}