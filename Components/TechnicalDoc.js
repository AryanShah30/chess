function createTechnicalDoc() {
    const docHTML = `
        <div id="tech-doc-overlay" class="tech-doc-overlay" style="display: none; opacity: 0;">
            <div class="documentation-modal">
                <div class="doc-header">
                    <h2>
                        <img src="Assets/images/code.png" alt="Code Documentation" class="doc-header-icon">
                        Technical Documentation
                    </h2>
                    <button class="doc-close-btn">CLOSE</button>
                </div>

                <div class="doc-content">
                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>1. Application Architecture Overview</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>1.1 Core Components</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <p>The chess application is built using a modular architecture with these key components:</p>
                                    
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>State Management</h5>
                                            <ul>
                                                <li>Board state (8x8 matrix)</li>
                                                <li>Piece tracking</li>
                                                <li>Move history</li>
                                                <li>Game clock</li>
                                            </ul>
                                        </div>

                                        <div class="feature-item">
                                            <h5>UI Components</h5>
                                            <ul>
                                                <li>Chessboard renderer</li>
                                                <li>Clock display</li>
                                                <li>Move notation</li>
                                                <li>Theme system</li>
                                            </ul>
                                        </div>

                                        <div class="feature-item">
                                            <h5>Game Logic</h5>
                                            <ul>
                                                <li>Move validation</li>
                                                <li>Check/checkmate detection</li>
                                                <li>Special moves (castling, en passant, promotion)</li>
                                            </ul>
                                        </div>

                                        <div class="feature-item">
                                            <h5>Event System</h5>
                                            <ul>
                                                <li>Move handling</li>
                                                <li>Clock management</li>
                                                <li>UI updates</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>1.2 Data Flow</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <p>The application follows a unidirectional data flow:</p>
                                    <div class="flow-diagram">
                                        <p>User Action → Validation → State Update → UI Update</p>
                                    </div>
                                    <ol>
                                        <li>User initiates a move (drag/click)</li>
                                        <li>Move validator checks legality</li>
                                        <li>Game state updates if move is legal</li>
                                        <li>UI components re-render to reflect changes</li>
                                        <li>Game clock switches</li>
                                        <li>Move is recorded in notation</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>2. User Interface Components</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>2.1 Chessboard</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Board Features</h5>
                                            <ul>
                                                <li>Square highlighting</li>
                                                <li>Move indicators</li>
                                                <li>Piece animations</li>
                                                <li>Drag and drop</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Visual Elements</h5>
                                            <ul>
                                                <li>Theme support</li>
                                                <li>Custom pieces</li>
                                                <li>Board coordinates</li>
                                                <li>Move markers</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>2.2 Game Controls</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Game Management</h5>
                                            <ul>
                                                <li>Start/Reset game</li>
                                                <li>Undo/Redo moves</li>
                                                <li>Flip board</li>
                                                <li>Settings menu</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Clock Controls</h5>
                                            <ul>
                                                <li>Time settings</li>
                                                <li>Increment options</li>
                                                <li>Pause/Resume</li>
                                                <li>Time warnings</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>3. Game Features</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>3.1 Customization</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Theme Options</h5>
                                            <ul>
                                                <li>Board colors</li>
                                                <li>Piece styles</li>
                                                <li>Light/Dark mode</li>
                                                <li>Custom themes</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Layout Options</h5>
                                            <ul>
                                                <li>Board size</li>
                                                <li>Clock position</li>
                                                <li>Notation display</li>
                                                <li>Control placement</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>3.2 Performance Optimizations</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Move Generation</h5>
                                            <ul>
                                                <li>Pre-calculated moves</li>
                                                <li>Move caching</li>
                                                <li>Lazy evaluation</li>
                                                <li>Batch updates</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Rendering</h5>
                                            <ul>
                                                <li>Virtual DOM</li>
                                                <li>RAF scheduling</li>
                                                <li>CSS transitions</li>
                                                <li>Layer compositing</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>4. Browser Compatibility</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>4.1 Core Features</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Move Execution</h5>
                                            <ul>
                                                <li>Drag and drop API</li>
                                                <li>Click handling</li>
                                                <li>Touch events</li>
                                                <li>Keyboard navigation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>5. Performance Considerations</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>5.1 Move Calculation</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Optimization Techniques</h5>
                                            <ul>
                                                <li>Move caching</li>
                                                <li>Cache utilization</li>
                                                <li>Lazy evaluation</li>
                                                <li>Early termination</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>5.2 Rendering Pipeline</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>DOM Updates</h5>
                                            <ul>
                                                <li>Batch processing</li>
                                                <li>Virtual DOM</li>
                                                <li>Event delegation</li>
                                                <li>Style recalculation</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Animation</h5>
                                            <ul>
                                                <li>GPU acceleration</li>
                                                <li>RAF scheduling</li>
                                                <li>CSS transitions</li>
                                                <li>Layer compositing</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>6. Browser Limitations</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>6.1 Known Issues</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Common Browser Challenges</h5>
                                            <ul>
                                                <li>Drag and drop</li>
                                                <li>Touch events</li>
                                                <li>Click-based movement</li>
                                                <li>Cookie storage</li>
                                                <li>setTimeout fallback</li>
                                                <li>CSS compatibility</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>6.2 Mobile Support</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Touch Events</h5>
                                            <ul>
                                                <li>Touch start/move/end handling</li>
                                                <li>Gesture recognition</li>
                                                <li>Pinch-to-zoom prevention</li>
                                                <li>Scroll management</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Responsive Design</h5>
                                            <ul>
                                                <li>Fluid board sizing</li>
                                                <li>Adaptive layouts</li>
                                                <li>Portrait/landscape handling</li>
                                                <li>Touch-friendly controls</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>7. Testing Methodology</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>7.1 Unit Testing</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Move Validation</h5>
                                            <ul>
                                                <li>Basic moves</li>
                                                <li>Special moves</li>
                                                <li>Edge cases</li>
                                                <li>Invalid moves</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Game Logic</h5>
                                            <ul>
                                                <li>Check detection</li>
                                                <li>Checkmate scenarios</li>
                                                <li>Draw conditions</li>
                                                <li>Game state transitions</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>7.2 Integration Testing</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Component Interaction</h5>
                                            <ul>
                                                <li>Move execution flow</li>
                                                <li>Clock synchronization</li>
                                                <li>Notation generation</li>
                                                <li>UI updates</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>State Management</h5>
                                            <ul>
                                                <li>State consistency</li>
                                                <li>Update propagation</li>
                                                <li>Error recovery</li>
                                                <li>Race condition handling</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>8. Code Organization</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>8.1 Project Structure</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="code-block">
                                        <pre>
/src
├── Components/     # UI components
├── Core/          # Game logic
├── Events/        # Event handlers
├── Helpers/       # Utility functions
├── Styles/        # CSS modules
└── Tests/         # Test suites
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>8.2 Coding Standards</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Style Guide</h5>
                                            <ul>
                                                <li>ESLint configuration</li>
                                                <li>Prettier formatting</li>
                                                <li>JSDoc documentation</li>
                                                <li>Type annotations</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Best Practices</h5>
                                            <ul>
                                                <li>Pure functions</li>
                                                <li>Immutable data</li>
                                                <li>Error boundaries</li>
                                                <li>Performance patterns</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>9. Debugging Features</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>9.1 Development Tools</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Debug Mode</h5>
                                            <ul>
                                                <li>Move validation logging</li>
                                                <li>State change tracking</li>
                                                <li>Performance metrics</li>
                                                <li>Error tracking</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Developer Console</h5>
                                            <ul>
                                                <li>Custom commands</li>
                                                <li>State inspection</li>
                                                <li>Move analysis</li>
                                                <li>Position setup</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="doc-section">
                        <div class="doc-section-header">
                            <h3>10. Security Considerations</h3>
                            <button class="dropdown-toggle">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div class="doc-section-content">
                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>10.1 Input Validation</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>Move Validation</h5>
                                            <ul>
                                                <li>Source verification</li>
                                                <li>Destination verification</li>
                                                <li>State consistency checks</li>
                                                <li>Timing validation</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>User Input</h5>
                                            <ul>
                                                <li>XSS prevention</li>
                                                <li>Data sanitization</li>
                                                <li>Rate limiting</li>
                                                <li>Input bounds checking</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="doc-subsection">
                                <div class="doc-subsection-header">
                                    <h4>10.2 State Protection</h4>
                                    <button class="dropdown-toggle">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="doc-subsection-content">
                                    <div class="feature-list">
                                        <div class="feature-item">
                                            <h5>State Validation</h5>
                                            <ul>
                                                <li>Checksum verification</li>
                                                <li>State transitions</li>
                                                <li>History consistency</li>
                                                <li>Time management</li>
                                            </ul>
                                        </div>
                                        <div class="feature-item">
                                            <h5>Access Control</h5>
                                            <ul>
                                                <li>Move permissions</li>
                                                <li>State modifications</li>
                                                <li>Theme customization</li>
                                                <li>Clock management</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add styles
    const styles = `
        .tech-doc-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .tech-doc-modal {
            background-color: #fff;
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
            height: 90vh;
            position: relative;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #4caf50 #f0f0f0;
        }

        .tech-doc-modal::-webkit-scrollbar {
            width: 8px;
        }

        .tech-doc-modal::-webkit-scrollbar-track {
            background: #f0f0f0;
        }

        .tech-doc-modal::-webkit-scrollbar-thumb {
            background-color: #4caf50;
            border-radius: 4px;
        }

        .tech-doc-content {
            padding: 24px;
            height: calc(100% - 60px); /* Adjust based on header height */
            overflow-y: visible;
        }

        .doc-section {
            background: var(--button-bg);
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
        }

        .doc-section:last-child {
            border-bottom: none;
        }

        .doc-section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            padding: 8px 0;
            transition: all 0.3s ease;
        }

        .doc-section-header h3 {
            color: #4caf50;
            margin: 0;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .doc-section-header:hover h3 {
            color: #45a049;
        }

        .doc-section-content {
            padding: 0;
            transition: all 0.3s ease;
            position: relative;
            z-index: 0;
            background: inherit;
            margin-bottom: 16px;
        }

        .doc-section-content h4 {
            color: #4caf50;
            margin: 16px 0 8px;
            font-size: 1.1rem;
        }

        .doc-section-content h5 {
            color: #2c3e50;
            margin: 12px 0 8px;
            font-size: 1rem;
        }

        .doc-section-content p {
            margin: 8px 0;
            color: #555;
        }

        .doc-section-content ul {
            margin: 8px 0;
            padding-left: 24px;
        }

        .doc-section-content li {
            margin: 6px 0;
            color: #555;
        }

        .code-block {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 16px;
            margin: 12px 0;
            font-family: monospace;
        }

        .code-block pre {
            margin: 0;
            white-space: pre-wrap;
            color: #333;
        }

        .feature-list {
            position: relative;
            z-index: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            margin: 16px 0;
        }

        .feature-item {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 16px;
        }

        /* Dark theme styles */
        [data-theme="dark"] .tech-doc-modal {
            background-color: #1e1e1e;
        }

        [data-theme="dark"] .doc-section {
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .doc-section-content {
            color: #e0e0e0;
        }

        [data-theme="dark"] .doc-section-content h5 {
            color: #b8c2cc;
        }

        [data-theme="dark"] .doc-section-content p,
        [data-theme="dark"] .doc-section-content li {
            color: #b0b0b0;
        }

        [data-theme="dark"] .code-block {
            background-color: #2d2d2d;
        }

        [data-theme="dark"] .code-block pre {
            color: #e0e0e0;
        }

        [data-theme="dark"] .feature-item {
            background-color: #2d2d2d;
        }

        .dropdown-toggle {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            color: #4caf50;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
        }

        .dropdown-toggle svg {
            transition: transform 0.3s ease;
        }

        .dropdown-toggle:hover {
            color: #45a049;
        }

        .doc-subsection {
            margin-left: 20px;
            margin-bottom: 20px;
            position: relative;
            z-index: 0;
            background: inherit;
        }
        
        .doc-subsection:last-child {
            margin-bottom: 0;
        }
        
        .doc-subsection-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            padding: 8px 0;
            transition: all 0.3s ease;
        }
        
        .doc-subsection-header h4 {
            color: #4caf50;
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .doc-subsection-content {
            padding-left: 16px;
            position: relative;
            z-index: 0;
            background: inherit;
            margin-bottom: 16px;
        }
        
        .flow-diagram {
            background-color: #f8f9fa;
            padding: 16px;
            border-radius: 6px;
            margin: 12px 0;
        }
        
        .flow-diagram p {
            text-align: center;
            font-weight: 500;
            margin: 0;
        }
        
        [data-theme="dark"] .flow-diagram {
            background-color: #2d2d2d;
        }
        
        .doc-section-content ol {
            margin: 12px 0;
            padding-left: 24px;
        }
        
        .doc-section-content ol li {
            margin: 8px 0;
            color: #555;
        }
        
        [data-theme="dark"] .doc-section-content ol li {
            color: #b0b0b0;
        }

        /* Ensure content is visible in dark theme */
        [data-theme="dark"] .documentation-modal {
            background-color: #1e1e1e;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    document.body.insertAdjacentHTML('beforeend', docHTML);

    // Add event listeners
    const techDocOverlay = document.getElementById('tech-doc-overlay');
    const closeBtn = techDocOverlay.querySelector('.doc-close-btn');
    const docModal = techDocOverlay.querySelector('.documentation-modal');

    // Add click handlers for section headers
    document.querySelectorAll('.doc-section-header, .doc-subsection-header').forEach(header => {
        const content = header.nextElementSibling;
        const toggleButton = header.querySelector('.dropdown-toggle');
        
        // Set initial state
        header.classList.add('collapsed');
        if (content) {
            content.style.display = 'none';
        }
        
        const toggleSection = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isCollapsed = header.classList.contains('collapsed');
            
            // Toggle collapsed state
            header.classList.toggle('collapsed');
            
            // Handle section header
            if (header.classList.contains('doc-section-header')) {
                const sectionContent = header.nextElementSibling;
                // Simply toggle the entire section content
                sectionContent.style.display = isCollapsed ? 'block' : 'none';
                
                // Ensure subsection headers are visible when section is expanded
                if (isCollapsed) {
                    const subsectionHeaders = sectionContent.querySelectorAll('.doc-subsection-header');
                    subsectionHeaders.forEach(subsectionHeader => {
                        subsectionHeader.style.display = 'flex';
                        // Show subsection content if it's not collapsed
                        const subsectionContent = subsectionHeader.nextElementSibling;
                        if (subsectionContent && !subsectionHeader.classList.contains('collapsed')) {
                            subsectionContent.style.display = 'block';
                        }
                    });
                }
            } else {
                // Handle subsection header
                if (content) {
                    content.style.display = isCollapsed ? 'block' : 'none';
                }
            }
            
            // Rotate arrow
            const svg = header.querySelector('svg');
            if (svg) {
                svg.style.transform = isCollapsed ? 'rotate(-180deg)' : 'rotate(0deg)';
            }
        };

        // Add click handlers
        header.addEventListener('click', (e) => {
            if (e.target === header || e.target === header.querySelector('h3') || e.target === header.querySelector('h4')) {
                toggleSection(e);
            }
        });
        
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleSection);
        }
    });

    const animateClose = () => {
        const codeIcon = document.querySelector('.code-icon img');
        const iconRect = codeIcon.getBoundingClientRect();

        docModal.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        docModal.style.transform = `translate(${iconRect.left - docModal.offsetWidth / 2 + iconRect.width / 2}px, ${iconRect.top - docModal.offsetHeight / 2 + iconRect.height / 2}px) scale(0.1)`;
        docModal.style.opacity = '0';
        techDocOverlay.style.opacity = '0';

        setTimeout(() => {
            techDocOverlay.style.display = 'none';
            docModal.style.transform = '';
            docModal.style.opacity = '1';
        }, 600);
    };

    closeBtn.addEventListener('click', animateClose);
}

function showTechnicalDoc() {
    const techDocOverlay = document.getElementById('tech-doc-overlay');
    techDocOverlay.style.display = 'flex';
    setTimeout(() => {
        techDocOverlay.style.opacity = '1';
    }, 50);
}

export { createTechnicalDoc, showTechnicalDoc }; 
